package site.newkiz.newsserver.entity.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import site.newkiz.newsserver.entity.NewsDocument;

@Getter
@AllArgsConstructor
public class NewsListDto {

  private List<NewsDocument> newsList;
  private String cursor;
}
