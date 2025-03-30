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
import site.newkiz.newsserver.entitiy.NewsScrap;
import site.newkiz.newsserver.entitiy.NewsSummary;
import site.newkiz.newsserver.entitiy.NewsDocument;
import site.newkiz.newsserver.entitiy.dto.NewsListDto;
import site.newkiz.newsserver.entitiy.dto.NewsScrapResponse;
import site.newkiz.newsserver.entitiy.dto.NewsSummaryRequest;
import site.newkiz.newsserver.global.ApiResponse;
import site.newkiz.newsserver.service.NewsService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/news")
public class NewsController {
  private final NewsService newsService;


  @GetMapping
  public ApiResponse<NewsListDto> getNews(@RequestParam(value = "cursor", required = false) String cursor) {
    List<NewsDocument> newsList = newsService.getAllNews(cursor);
    String nextCursor = (newsList.isEmpty()) ? null : newsList.get(newsList.size() - 1).getId();
    return ApiResponse.success(new NewsListDto(newsList, nextCursor));
  }

  @GetMapping("/{newsId}")
  public ApiResponse<NewsDocument> getNewsById(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "USER-ID") String userId) {
    NewsDocument news = newsService.getNewsById(newsId, userId);
    return ApiResponse.success(news);
  }

  @GetMapping("/category/{categoryId}")
  public ApiResponse<NewsListDto> getNewsByCategory(@RequestParam(value = "cursor", required = false) String cursor,
      @PathVariable(value = "categoryId") String categoryId) {
    List<NewsDocument> newsList = newsService.getNewsByCategory(cursor, categoryId);
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
      @RequestHeader(value = "USER-ID") String userId) {
    NewsSummary newsSummary = newsService.getNewsSummary(newsId, userId);
    return ApiResponse.success(newsSummary);
  }

  @PostMapping("/{newsId}/summary")
  public ApiResponse<NewsSummary> postNewsSummary(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "USER-ID") String userId, @RequestBody NewsSummaryRequest request) {
    NewsSummary newsSummary = newsService.postNewsSummary(newsId, userId, request.getSummary());
    return ApiResponse.success(newsSummary);
  }

  @GetMapping("/{newsId}/scrap")
  public ApiResponse<NewsScrapResponse> isScrappedNews(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "USER-ID") String userId) {
    return ApiResponse.success(newsService.isScrappedNews(newsId, userId));
  }

  @PostMapping("/{newsId}/scrap")
  public ApiResponse<NewsScrap> scrapNews(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "USER-ID") String userId) {
    return ApiResponse.success(newsService.scrapNews(newsId, userId));
  }

  @DeleteMapping("/{newsId}/scrap")
  public ApiResponse<Void> deleteScrappedNews(@PathVariable(value = "newsId") String newsId,
      @RequestHeader(value = "USER-ID") String userId) {
    newsService.deleteScrappedNews(newsId, userId);
    return ApiResponse.success();
  }
}
