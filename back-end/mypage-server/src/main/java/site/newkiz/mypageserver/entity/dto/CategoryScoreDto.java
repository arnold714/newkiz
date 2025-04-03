package site.newkiz.mypageserver.entity.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CategoryScoreDto {

  private Integer userId;
  private Integer POLITICS;
  private Integer ECONOMY;
  private Integer SOCIETY;
  private Integer CULTURE;
  private Integer IT_SCIENCE;
  private Integer WORLD;
  private Integer SPORTS;
}
