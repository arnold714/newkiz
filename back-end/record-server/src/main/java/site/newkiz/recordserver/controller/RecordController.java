package site.newkiz.recordserver.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.newkiz.recordserver.entity.NewsDocument;
import site.newkiz.recordserver.entity.NewsQuizDocument;
import site.newkiz.recordserver.entity.dto.SummaryRecordDto;
import site.newkiz.recordserver.global.ApiResponse;
import site.newkiz.recordserver.service.RecordService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/records")
public class RecordController {

  private final RecordService recordService;

  @GetMapping("/summary")
  public ApiResponse<List<SummaryRecordDto>> getSummary(@RequestHeader("User-Id") String userId) {
    return ApiResponse.success(recordService.getSummaryRecords(userId));
  }

  @GetMapping("/news")
  public ApiResponse<List<NewsDocument>> getViewedNews(
      @RequestHeader("User-Id") String userId) {
    return ApiResponse.success(recordService.getViewedNews(userId));
  }

  @GetMapping("/news/today")
  public ApiResponse<Integer> getCountToday(
      @RequestHeader("User-Id") String userId) {
    return ApiResponse.success(recordService.getCountToday(userId));
  }

  @GetMapping("/quiz")
  public ApiResponse<List<NewsQuizDocument>> getQuiz(
      @RequestHeader("User-Id") String userId) {
    return ApiResponse.success(recordService.getQuiz(userId));
  }

  @PostMapping("/quiz/{quizId}")
  public ApiResponse<Void> updateQuizLog(
      @RequestHeader("User-Id") String userId,
      @PathVariable String quizId) {
    recordService.updateQuizLog(userId, quizId);
    return ApiResponse.success();
  }
}
