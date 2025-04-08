package site.newkiz.newsserver.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import site.newkiz.newsserver.entity.NewsDocument;
import site.newkiz.newsserver.entity.NewsQuizDocument;
import site.newkiz.newsserver.entity.NewsScrap;
import site.newkiz.newsserver.entity.NewsSummary;
import site.newkiz.newsserver.entity.NewsViewLog;
import site.newkiz.newsserver.entity.QuizSolveLog;
import site.newkiz.newsserver.entity.SearchLog;
import site.newkiz.newsserver.entity.dto.NewsScrapResponse;
import site.newkiz.newsserver.entity.dto.RecommendResponse;
import site.newkiz.newsserver.entity.enums.NewsCategory;
import site.newkiz.newsserver.entity.enums.NewsDetailCategory;
import site.newkiz.newsserver.global.exception.BadRequestException;
import site.newkiz.newsserver.global.exception.NotFoundException;
import site.newkiz.newsserver.repository.NewsQuizRepository;
import site.newkiz.newsserver.repository.NewsRepository;
import site.newkiz.newsserver.repository.NewsScrapRepository;
import site.newkiz.newsserver.repository.NewsSummaryRepository;
import site.newkiz.newsserver.repository.NewsViewLogRepository;
import site.newkiz.newsserver.repository.SearchLogRepository;

@Service
@RequiredArgsConstructor
public class NewsService {

  private final NewsRepository newsRepository;
  private final NewsViewLogRepository newsViewLogRepository;
  private final NewsSummaryRepository newsSummaryRepository;
  private final NewsScrapRepository newsScrapRepository;
  private final NewsQuizRepository newsQuizRepository;
  private final SearchLogRepository searchLogRepository;
  private final MongoTemplate mongoTemplate;
  private final RestTemplate restTemplate;


  @Value("${article.limit}")
  private int LIMIT;

  @Value("${article.today}")
  private int TODAY_LIMIT;

  @Value("${article.db}")
  private String ARTICLE_DB;

  @Value("${recommend.api-url}")
  private String recommendApiUrl;


  public List<NewsDocument> getAllNews(String cursorIdStr) {
    Pageable pageable = PageRequest.of(0, LIMIT, Sort.by(Sort.Direction.DESC, "_id"));

    if (cursorIdStr == null || cursorIdStr.isEmpty()) {
      return newsRepository.findTop20ByOrderByIdDesc();  // 첫 페이지
    } else {
      ObjectId cursor;
      try {
        cursor = new ObjectId(cursorIdStr);
      } catch (Exception e) {
        throw new BadRequestException("Invalid cursor format");
      }

      return newsRepository.findNewsByCursor(cursor, pageable);  // 이후 페이지
    }
  }

  @Transactional
  public NewsDocument getNewsById(String newsId, String userId) {
    NewsDocument newsDocument = newsRepository.findById(newsId)
        .orElseThrow(() -> new NotFoundException("News not found"));

    // 사용자 조회 로그 있는지 확인
    boolean hasViewed = newsViewLogRepository.existsByUserIdAndNewsId(userId, newsId);

    if (!hasViewed) {
      // 조회수 증가
      mongoTemplate.updateFirst(
          Query.query(Criteria.where("_id").is(newsId)),
          new Update().inc("views", 1),
          NewsDocument.class
      );

      mongoTemplate.updateFirst(
          Query.query(Criteria.where("_id").is(Integer.parseInt(userId))),
          new Update().inc(NewsCategory.fromKoreanName(newsDocument.getCategory()).toString(), 1),
          "category_score"
      );
      // 로컬 객체에도 증가 반영
      newsDocument.setViews(newsDocument.getViews() + 1);

      // 조회 로그 저장
      NewsViewLog viewLog = NewsViewLog.builder()
          .userId(userId)
          .newsId(newsId)
          .build();
      newsViewLogRepository.save(viewLog);
    }

    return newsDocument;
  }


  public List<NewsDocument> getNewsByCategory(String cursorIdStr, String categoryId) {
    Pageable pageable = PageRequest.of(0, LIMIT, Sort.by(Sort.Direction.DESC, "_id"));
    String category;
    try {
      category = NewsCategory.valueOf(categoryId).getKoreanName();
    } catch (Exception e) {
      throw new BadRequestException("Invalid category");
    }
    if (cursorIdStr == null || cursorIdStr.isEmpty()) {
      // 첫 페이지: 카테고리별 최신 뉴스 20개
      return newsRepository.findTop20ByCategoryOrderByIdDesc(category);
    } else {
      ObjectId cursor;
      try {
        cursor = new ObjectId(cursorIdStr);
      } catch (Exception e) {
        throw new BadRequestException("Invalid cursor format");
      }

      // 이후 페이지: 카테고리 AND 커서 기반 페이징
      return newsRepository.findNewsByCategoryAndCursor(category, cursor, pageable);
    }
  }

  public List<NewsDocument> getNewsBySubcategory(String cursorIdStr, String subcategoryId) {
    Pageable pageable = PageRequest.of(0, LIMIT, Sort.by(Sort.Direction.DESC, "_id"));
    String category;
    try {
      category = NewsDetailCategory.valueOf(subcategoryId).getKoreanName();
    } catch (Exception e) {
      throw new BadRequestException("Invalid category");
    }
    if (cursorIdStr == null || cursorIdStr.isEmpty()) {
      // 첫 페이지: 카테고리별 최신 뉴스 20개
      return newsRepository.findTop20BySubCategoryOrderByIdDesc(category);
    } else {
      ObjectId cursor;
      try {
        cursor = new ObjectId(cursorIdStr);
      } catch (Exception e) {
        throw new BadRequestException("Invalid cursor format");
      }

      // 이후 페이지: 카테고리 AND 커서 기반 페이징
      return newsRepository.findNewsBySubCategoryAndCursor(category, cursor, pageable);
    }
  }

  public List<NewsDocument> getTop5NewsTodayOrYesterday() {
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime todayStart = now.toLocalDate().atStartOfDay();
    LocalDateTime todayEnd = todayStart.plusDays(1);
    LocalDateTime yesterdayStart = todayStart.minusDays(1);
    LocalDateTime yesterdayEnd = todayStart;

    // 1. 오늘 뉴스 5개 시도
    Query todayQuery = new Query(Criteria.where("published").gte(todayStart).lt(todayEnd))
        .with(Sort.by(Sort.Direction.DESC, "views"))
        .limit(TODAY_LIMIT);

    List<NewsDocument> todayTopNews = mongoTemplate.find(todayQuery, NewsDocument.class);

    if (todayTopNews.size() >= 5) {
      return todayTopNews;
    }

    // 2. 부족할 경우 어제 뉴스로 대체
    Query yesterdayQuery = new Query(
        Criteria.where("published").gte(yesterdayStart).lt(yesterdayEnd))
        .with(Sort.by(Sort.Direction.DESC, "views"))
        .limit(TODAY_LIMIT);

    return mongoTemplate.find(yesterdayQuery, NewsDocument.class);
  }

  public NewsSummary getNewsSummary(String newsId, String userId) {
    return newsSummaryRepository.findByNewsIdAndUserId(newsId, userId)
        .orElseThrow(() -> new NotFoundException("요약이 존재하지 않습니다."));
  }

  public NewsSummary postNewsSummary(String newsId, String userId, String summaryText) {
    NewsSummary newsSummary = newsSummaryRepository.findByNewsIdAndUserId(newsId, userId)
        .map(existing -> {
          existing.setSummary(summaryText);
          return existing;
        })
        .orElse(NewsSummary.builder()
            .newsId(newsId)
            .userId(userId)
            .summary(summaryText)
            .build());

    return newsSummaryRepository.save(newsSummary);
  }


  public NewsScrapResponse isScrappedNews(String newsId, String userId) {
    boolean isScrapped = newsScrapRepository.existsByUserIdAndNewsId(userId, newsId);
    return new NewsScrapResponse(isScrapped);
  }

  @Transactional
  public NewsScrap scrapNews(String newsId, String userId) {
    NewsDocument newsDocument = newsRepository.findById(newsId)
        .orElseThrow(() -> new NotFoundException("뉴스가 존재하지 않습니다."));
    boolean alreadyScrapped = newsScrapRepository.existsByUserIdAndNewsId(userId, newsId);

    if (alreadyScrapped) {
      throw new BadRequestException("이미 스크랩한 뉴스입니다.");
    }

    Query query = new Query(Criteria.where("_id").is(newsId));
    Update update = new Update().inc("scrap", 1);
    mongoTemplate.updateFirst(query, update, ARTICLE_DB);

    mongoTemplate.updateFirst(
        Query.query(Criteria.where("_id").is(Integer.parseInt(userId))),
        new Update().inc(NewsCategory.fromKoreanName(newsDocument.getCategory()).toString(), 3),
        "category_score"
    );

    NewsScrap scrap = NewsScrap.builder()
        .userId(userId)
        .newsId(newsId)
        .build();

    return newsScrapRepository.save(scrap);
  }

  @Transactional
  public void deleteScrappedNews(String newsId, String userId) {
    NewsDocument newsDocument = newsRepository.findById(newsId)
        .orElseThrow(() -> new NotFoundException("뉴스가 존재하지 않습니다."));
    boolean alreadyScrapped = newsScrapRepository.existsByUserIdAndNewsId(userId, newsId);

    if (!alreadyScrapped) {
      throw new BadRequestException("스크랩 되지 않은 뉴스입니다.");
    }
    newsScrapRepository.deleteByUserIdAndNewsId(userId, newsId)
        .orElseThrow(() -> new NotFoundException("스크랩 정보가 존재하지 않습니다."));

    mongoTemplate.updateFirst(
        Query.query(Criteria.where("_id").is(Integer.parseInt(userId))),
        new Update().inc(NewsCategory.fromKoreanName(newsDocument.getCategory()).toString(), -3),
        "category_score"
    );

    // 2. scrap 수 -1 처리 (음수 방지는 별도 처리 가능)
    Query query = new Query(Criteria.where("_id").is(newsId));
    Update update = new Update().inc("scrap", -1);
    mongoTemplate.updateFirst(query, update, ARTICLE_DB);
  }

  public NewsQuizDocument getQuiz(String newsId) {
    return newsQuizRepository.findById(newsId)
        .orElseThrow(() -> new NotFoundException("퀴즈가 존재하지 않습니다."));
  }

  public void solveQuiz(String userId, String newsId, Boolean isCorrect) {
    mongoTemplate.save(QuizSolveLog.builder()
        .userId(userId)
        .newsId(newsId)
        .isCorrect(isCorrect)
        .build());
  }

  public boolean checkQuiz(String userId, String newsId) {
    QuizSolveLog quizSolveLog = mongoTemplate.findOne(
        Query.query(Criteria.where("userId").is(userId).and("newsId").is(newsId)),
        QuizSolveLog.class
    );

    return quizSolveLog != null;
  }

  public List<NewsDocument> searchNewsByTitle(String userId, String keyword, String cursorIdStr) {
    logSearch(userId, keyword);

    Pageable pageable = PageRequest.of(0, LIMIT, Sort.by(Sort.Direction.DESC, "_id"));

    if (cursorIdStr == null || cursorIdStr.isEmpty()) {
      return newsRepository.findTop20ByTitleContainingOrderByIdDesc(keyword);  // 첫 페이지
    } else {
      ObjectId cursor;
      try {
        cursor = new ObjectId(cursorIdStr);
      } catch (Exception e) {
        throw new BadRequestException("Invalid cursor format");
      }

      return newsRepository.findByTitleContainingAndCursor(keyword, cursor, pageable);  // 이후 페이지
    }
  }

  private void logSearch(String userId, String keyword) {

    SearchLog searchLog = searchLogRepository.findByUserIdAndKeyword(userId, keyword)
        .orElseGet(() -> {
          SearchLog newLog = new SearchLog();
          newLog.setUserId(userId);
          newLog.setKeyword(keyword);
          return newLog;
        });

    searchLog.setSearchedAt(LocalDateTime.now());
    searchLogRepository.save(searchLog);
  }

  public List<SearchLog> getRecentSearches(String userId) {
    return searchLogRepository.findTop5ByUserIdOrderBySearchedAtDesc(userId);
  }

  public void deleteSearchLogById(String id, String userId) {
    SearchLog searchLog = searchLogRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("검색 로그가 존재하지 않습니다."));

    if (!searchLog.getUserId().equals(userId)) {
      throw new NotFoundException("해당 사용자의 검색 로그가 아닙니다.");
    }

    searchLogRepository.deleteById(id);
  }

  public List<NewsDocument> getRecommendedNews(String userId) {
    String fastApiUrl = recommendApiUrl + "/api/recommend";

    // 요청 바디 생성
    Map<String, Object> request = new HashMap<>();
    request.put("user_id", userId);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(request, headers);

    // 응답을 RecommendationResponse로 받기
    ResponseEntity<RecommendResponse> response = restTemplate.postForEntity(
        fastApiUrl,
        httpEntity,
        RecommendResponse.class
    );

    List<String> recommendedIds = response.getBody().getRecommended();

    // DB에서 NewsDocument 리스트 조회
    List<NewsDocument> documents = newsRepository.findByIdIn(recommendedIds);

    // ID 순서 보장 필요 시 정렬
    Map<String, NewsDocument> docMap = documents.stream()
        .collect(Collectors.toMap(NewsDocument::getId, Function.identity()));

    return recommendedIds.stream()
        .map(docMap::get)
        .filter(Objects::nonNull)
        .toList();
  }


  public List<NewsDocument> getRecommendedNewsByCategory(String userId, String categoryId) {
    String fastApiUrl = recommendApiUrl + "/api/recommend/category";

    // 요청 바디 생성
    Map<String, Object> request = new HashMap<>();
    request.put("user_id", userId);
    request.put("category_id", NewsCategory.valueOf(categoryId).getKoreanName());

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(request, headers);

    // 응답을 RecommendationResponse로 받기
    ResponseEntity<RecommendResponse> response = restTemplate.postForEntity(
        fastApiUrl,
        httpEntity,
        RecommendResponse.class
    );

    List<String> recommendedIds = response.getBody().getRecommended();

    // DB에서 NewsDocument 리스트 조회
    List<NewsDocument> documents = newsRepository.findByIdIn(recommendedIds);

    // ID 순서 보장 필요 시 정렬
    Map<String, NewsDocument> docMap = documents.stream()
        .collect(Collectors.toMap(NewsDocument::getId, Function.identity()));

    return recommendedIds.stream()
        .map(docMap::get)
        .filter(Objects::nonNull)
        .toList();
  }

  public List<SearchLogRepository.KeywordCount> getTop10MostSearchedKeywordsWithin24Hours() {
    LocalDateTime from = LocalDateTime.now().minusHours(24);
    return searchLogRepository.findTop10MostSearchedKeywordsWithin24Hours(from);
  }
}
