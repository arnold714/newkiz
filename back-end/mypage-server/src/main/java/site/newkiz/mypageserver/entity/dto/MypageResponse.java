package site.newkiz.mypageserver.entity.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import site.newkiz.mypageserver.entity.Profile;

@Getter
@Builder
public class MypageResponse {

  private Profile profile;
  private List<String> interests;
}
