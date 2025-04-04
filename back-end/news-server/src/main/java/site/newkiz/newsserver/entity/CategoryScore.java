package site.newkiz.newsserver.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "category_score")
public class CategoryScore {

  @Id
  private Integer userId;
  private Integer POLITICS;
  private Integer ECONOMY;
  private Integer SOCIETY;
  private Integer CULTURE;
  private Integer IT_SCIENCE;
  private Integer WORLD;
  private Integer SPORTS;
}
