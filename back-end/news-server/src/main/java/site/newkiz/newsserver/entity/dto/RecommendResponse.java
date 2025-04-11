package site.newkiz.newsserver.entity.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class RecommendResponse {

  private String user_id;
  private List<String> recommended;
}
