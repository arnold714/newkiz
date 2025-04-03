package site.newkiz.newsserver.service;

import java.beans.Transient;
import java.time.LocalDateTime;
import java.util.List;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.newkiz.newsserver.entitiy.CategoryScore;
import site.newkiz.newsserver.entitiy.NewsScrap;
import site.newkiz.newsserver.entitiy.NewsSummary;
import site.newkiz.newsserver.entitiy.NewsDocument;
import site.newkiz.newsserver.entitiy.NewsViewLog;
import site.newkiz.newsserver.entitiy.dto.NewsScrapResponse;
import site.newkiz.newsserver.entitiy.enums.NewsCategory;
import site.newkiz.newsserver.global.exception.BadRequestException;
import site.newkiz.newsserver.global.exception.NotFoundException;
import site.newkiz.newsserver.repository.NewsRepository;
import site.newkiz.newsserver.repository.NewsScrapRepository;
import site.newkiz.newsserver.repository.NewsSummaryRepository;
import site.newkiz.newsserver.repository.NewsViewLogRepository;

@Service
@RequiredArgsConstructor
public class NewsService {
  private final NewsRepository newsRepository;
  private final NewsViewLogRepository newsViewLogRepository;
  private final NewsSummaryRepository newsSummaryRepository;
  private final NewsScrapRepository newsScrapRepository;
  private final MongoTemplate mongoTemplate;


  @Value("${article.limit}")
  private int LIMIT;

  @Value("${article.today}")
  private int TODAY_LIMIT;

  @Value("${article.db}")
  private String ARTICLE_DB;


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
    Query yesterdayQuery = new Query(Criteria.where("published").gte(yesterdayStart).lt(yesterdayEnd))
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
    NewsDocument newsDocument = newsRepository.findById(newsId).orElseThrow(() -> new NotFoundException("뉴스가 존재하지 않습니다."));
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
    NewsDocument newsDocument = newsRepository.findById(newsId).orElseThrow(() -> new NotFoundException("뉴스가 존재하지 않습니다."));
    boolean alreadyScrapped = newsScrapRepository.existsByUserIdAndNewsId(userId, newsId);

    if (!alreadyScrapped) {
      throw new BadRequestException("스크랩 되지 않은 뉴스입니다.");
    }
    newsScrapRepository.deleteByUserIdAndNewsId(userId, newsId).orElseThrow(() -> new NotFoundException("스크랩 정보가 존재하지 않습니다."));

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
}
