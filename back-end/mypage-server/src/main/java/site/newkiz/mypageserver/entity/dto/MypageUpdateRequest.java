package site.newkiz.mypageserver.entity.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class MypageUpdateRequest {

  private String nickname;
  private Integer school;
  private Integer difficulty;
  private List<String> interests;
}
