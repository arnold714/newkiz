package site.newkiz.newsserver.entitiy.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import site.newkiz.newsserver.entitiy.NewsDocument;

@Getter
@AllArgsConstructor
public class NewsListDto {
  private List<NewsDocument> newsList;
  private String cursor;
}
