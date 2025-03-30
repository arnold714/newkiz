package site.newkiz.newsserver.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import site.newkiz.newsserver.entitiy.NewsDocument;
import site.newkiz.newsserver.entitiy.dto.NewsListDto;
import site.newkiz.newsserver.entitiy.enums.NewsCategory;
import site.newkiz.newsserver.global.ApiResponse;
import site.newkiz.newsserver.global.exception.NotFoundException;
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

}
