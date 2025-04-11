package site.newkiz.newsserver.entity.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class RelatedResponse {

  private String input_id;
  private List<String> related_news;
}
