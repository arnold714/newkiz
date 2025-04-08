package site.newkiz.newsserver.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import site.newkiz.newsserver.entity.NewsDocument;
import site.newkiz.newsserver.entity.NewsQuizDocument;
import site.newkiz.newsserver.entity.NewsScrap;
import site.newkiz.newsserver.entity.NewsSummary;
import site.newkiz.newsserver.entity.SearchLog;
import site.newkiz.newsserver.entity.dto.NewsListDto;
import site.newkiz.newsserver.entity.dto.NewsScrapResponse;
import site.newkiz.newsserver.entity.dto.NewsSummaryRequest;
import site.newkiz.newsserver.entity.dto.SolveQuizRequest;
import site.newkiz.newsserver.global.ApiResponse;
import site.newkiz.newsserver.repository.SearchLogRepository;
import site.newkiz.newsserver.service.NewsService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/news")
public class NewsController {

  private final NewsService newsService;


  @GetMapping
  public ApiResponse<NewsListDto> getNews(
      @RequestParam(value = "cursor", required = false) String cursor) {
    List<NewsDocument> newsList = newsService.getAllNews(cursor);
    String nextCursor = (newsList.isEmpty()) ? null : newsList.get(newsList.size() - 1).getId();
    return ApiResponse.success(new NewsListDto(newsList, nextCursor));
  }

  @GetMapping("/{newsId}")
  public ApiResponse<NewsDocument> getNewsById(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "User-Id") String userId) {
    NewsDocument news = newsService.getNewsById(newsId, userId);
    return ApiResponse.success(news);
  }

  @GetMapping("/category/{categoryId}")
  public ApiResponse<NewsListDto> getNewsByCategory(
      @RequestParam(value = "cursor", required = false) String cursor,
      @PathVariable(value = "categoryId") String categoryId) {
    List<NewsDocument> newsList = newsService.getNewsByCategory(cursor, categoryId);
    String nextCursor = (newsList.isEmpty()) ? null : newsList.get(newsList.size() - 1).getId();
    return ApiResponse.success(new NewsListDto(newsList, nextCursor));
  }

  @GetMapping("/subcategory/{subcategoryId}")
  public ApiResponse<NewsListDto> getNewsBySubcategory(
      @RequestParam(value = "cursor", required = false) String cursor,
      @PathVariable(value = "subcategoryId") String subcategoryId) {
    List<NewsDocument> newsList = newsService.getNewsBySubcategory(cursor, subcategoryId);
    String nextCursor = (newsList.isEmpty()) ? null : newsList.get(newsList.size() - 1).getId();
    return ApiResponse.success(new NewsListDto(newsList, nextCursor));
  }

  @GetMapping("/today")
  public ApiResponse<List<NewsDocument>> getTodayTopNews() {
    List<NewsDocument> hotNews = newsService.getTop5NewsTodayOrYesterday();
    return ApiResponse.success(hotNews);
  }

  @GetMapping("/{newsId}/summary")
  public ApiResponse<NewsSummary> getNewsSummary(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "User-Id") String userId) {
    NewsSummary newsSummary = newsService.getNewsSummary(newsId, userId);
    return ApiResponse.success(newsSummary);
  }

  @PostMapping("/{newsId}/summary")
  public ApiResponse<NewsSummary> postNewsSummary(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "User-Id") String userId, @RequestBody NewsSummaryRequest request) {
    NewsSummary newsSummary = newsService.postNewsSummary(newsId, userId, request.getSummary());
    return ApiResponse.success(newsSummary);
  }

  @GetMapping("/{newsId}/scrap")
  public ApiResponse<NewsScrapResponse> isScrappedNews(
      @PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "User-Id") String userId) {
    return ApiResponse.success(newsService.isScrappedNews(newsId, userId));
  }

  @PostMapping("/{newsId}/scrap")
  public ApiResponse<NewsScrap> scrapNews(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "User-Id") String userId) {
    return ApiResponse.success(newsService.scrapNews(newsId, userId));
  }

  @DeleteMapping("/{newsId}/scrap")
  public ApiResponse<Void> deleteScrappedNews(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "User-Id") String userId) {
    newsService.deleteScrappedNews(newsId, userId);
    return ApiResponse.success();
  }

  /*
  퀴즈 문제 가져오기
   */
  @GetMapping("/{newsId}/quiz")
  public ApiResponse<NewsQuizDocument> getQuiz(@PathVariable(value = "newsId") String newsId) {
    NewsQuizDocument quiz = newsService.getQuiz(newsId);
    return ApiResponse.success(quiz);
  }

  /*
  문제를 풀었는지 안풀었는지 확인
  풀었으면 true, 안풀었으면 false
   */
  @GetMapping("/{newsId}/quiz/check")
  public ApiResponse<Boolean> checkQuiz(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "User-Id") String userId) {
    boolean isSolved = newsService.checkQuiz(userId, newsId);
    return ApiResponse.success(isSolved);
  }

  /*
  정답인지 아닌지 문제 확인
   */
  @PostMapping("/{newsId}/quiz")
  public ApiResponse<Void> solveQuiz(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "User-Id") String userId,
      @RequestBody SolveQuizRequest solveQuizRequest) {
    newsService.solveQuiz(userId, newsId, solveQuizRequest.getIsCorrect());

    return ApiResponse.success();
  }

  @GetMapping("/search")
  public ApiResponse<NewsListDto> searchNewsByTitle(
      @RequestHeader(value = "User-Id") String userId,
      @RequestParam(value = "keyword") String keyword,
      @RequestParam(value = "cursor", required = false) String cursor) {
    List<NewsDocument> newsList = newsService.searchNewsByTitle(userId, keyword, cursor);
    String nextCursor = (newsList.isEmpty()) ? null : newsList.get(newsList.size() - 1).getId();
    return ApiResponse.success(new NewsListDto(newsList, nextCursor));
  }

  @GetMapping("/search/recent")
  public ApiResponse<List<SearchLog>> getRecentSearches(
      @RequestHeader(value = "User-Id") String userId) {
    List<SearchLog> recentSearches = newsService.getRecentSearches(userId);
    return ApiResponse.success(recentSearches);
  }

  @DeleteMapping("/search/{searchId}")
  public ApiResponse<Void> deleteSearchLogById(@PathVariable("searchId") String searchId,
      @RequestHeader(value = "User-Id") String userId) {
    newsService.deleteSearchLogById(searchId, userId);
    return ApiResponse.success();
  }

  @GetMapping("/search/cloud")
  public ApiResponse<List<SearchLogRepository.KeywordCount>> getTop10MostSearchedKeywordsWithin24Hours() {
    List<SearchLogRepository.KeywordCount> top10Keywords = newsService.getTop10MostSearchedKeywordsWithin24Hours();
    return ApiResponse.success(top10Keywords);
  }

  @GetMapping("/recommend")
  public ApiResponse<List<NewsDocument>> getRecommendedNews(
      @RequestHeader(value = "User-Id") String userId) {
    List<NewsDocument> recommendedNews = newsService.getRecommendedNews(userId);
    return ApiResponse.success(recommendedNews);
  }

  @GetMapping("/recommend/category/{categoryId}")
  public ApiResponse<List<NewsDocument>> getRecommendedNews(
      @RequestHeader(value = "User-Id") String userId,
      @PathVariable(value = "categoryId") String categoryId) {
    List<NewsDocument> recommendedNews = newsService.getRecommendedNewsByCategory(userId,
        categoryId);
    return ApiResponse.success(recommendedNews);
  }

  @GetMapping("/{newsId}/related")
  public ApiResponse<List<NewsDocument>> getRelatedNews(
      @PathVariable(value = "newsId") String newsId) {
    List<NewsDocument> relatedNews = newsService.getRelatedNews(newsId);
    return ApiResponse.success(relatedNews);
  }
}
