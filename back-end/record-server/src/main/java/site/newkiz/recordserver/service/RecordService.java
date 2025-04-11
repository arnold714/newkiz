package site.newkiz.recordserver.service;

import com.mongodb.client.result.UpdateResult;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import site.newkiz.recordserver.entity.NewsDocument;
import site.newkiz.recordserver.entity.NewsQuizDocument;
import site.newkiz.recordserver.entity.NewsSummary;
import site.newkiz.recordserver.entity.NewsViewLog;
import site.newkiz.recordserver.entity.QuizSolveLog;
import site.newkiz.recordserver.entity.dto.SummaryRecordDto;
import site.newkiz.recordserver.global.exception.NotFoundException;
import site.newkiz.recordserver.repository.NewsQuizRepository;
import site.newkiz.recordserver.repository.NewsRepository;
import site.newkiz.recordserver.repository.NewsSummaryRepository;
import site.newkiz.recordserver.repository.NewsViewLogRepository;
import site.newkiz.recordserver.repository.QuizSolveLogRepository;

@Service
@RequiredArgsConstructor
public class RecordService {

  private final NewsSummaryRepository newsSummaryRepository;
  private final NewsViewLogRepository newsViewLogRepository;
  private final NewsQuizRepository newsQuizRepository;
  private final NewsRepository newsRepository;
  private final QuizSolveLogRepository quizSolveLogRepository;
  private final MongoTemplate mongoTemplate;

  public List<SummaryRecordDto> getSummaryRecords(String userId) {
    List<NewsSummary> newsSummaries = newsSummaryRepository.findByUserId(userId);
    return newsSummaries.stream()
        .map(summary -> {
          NewsDocument newsDocument = newsRepository.findById(summary.getNewsId())
              .orElseThrow(() -> new NotFoundException("News not found"));
          return SummaryRecordDto.builder()
              .newsSummary(summary)
              .newsDocument(newsDocument)
              .build();
        })
        .collect(Collectors.toList());
  }

  public List<NewsDocument> getViewedNews(String userId) {
    List<NewsViewLog> viewLogs = newsViewLogRepository.findByUserId(userId);
    return viewLogs.stream()
        .map(viewLog -> newsRepository.findById(viewLog.getNewsId())
            .orElseThrow(() -> new NotFoundException("News not found")))
        .collect(Collectors.toList());
  }

  public Integer getCountToday(String userId) {
    LocalDateTime startOfDay = LocalDateTime.now().toLocalDate().atStartOfDay();
    return newsViewLogRepository.countByUserIdAndViewedAtAfter(userId, startOfDay);
  }

  public List<NewsQuizDocument> getQuiz(String userId) {
    List<QuizSolveLog> incorrectLogs = quizSolveLogRepository.findByUserIdAndIsCorrect(userId,
        false);
    return incorrectLogs.stream()
        .map(log -> newsQuizRepository.findById(log.getNewsId())
            .orElseThrow(() -> new NotFoundException("Quiz not found")))
        .collect(Collectors.toList());
  }

  public void updateQuizLog(String userId, String newsId) {
    Query query = new Query(Criteria.where("userId").is(userId).and("newsId").is(newsId));
    Update update = new Update().set("isCorrect", true);
    UpdateResult result = mongoTemplate.updateFirst(query, update, QuizSolveLog.class);
    if (result.getMatchedCount() == 0) {
      throw new NotFoundException("Quiz Solve Log not found");
    }
  }
}
