package site.newkiz.newsserver.service;

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
import site.newkiz.newsserver.entitiy.NewsDocument;
import site.newkiz.newsserver.entitiy.NewsViewLog;
import site.newkiz.newsserver.entitiy.enums.NewsCategory;
import site.newkiz.newsserver.global.exception.BadRequestException;
import site.newkiz.newsserver.global.exception.NotFoundException;
import site.newkiz.newsserver.repository.NewsRepository;
import site.newkiz.newsserver.repository.NewsViewLogRepository;

@Service
@RequiredArgsConstructor
public class NewsService {
  private final NewsRepository newsRepository;
  private final NewsViewLogRepository newsViewLogRepository;
  private final MongoTemplate mongoTemplate;


  @Value("${article.limit}")
  private int LIMIT;

  @Value("${article.today}")
  private int TODAY_LIMIT;


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

      // 로컬 객체에도 증가 반영
      newsDocument.setViews(newsDocument.getViews() + 1);

      // 조회 로그 저장
      NewsViewLog viewLog = NewsViewLog.builder()
          .userId(userId)
          .newsId(newsId)
          .viewedAt(LocalDateTime.now())
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

}
