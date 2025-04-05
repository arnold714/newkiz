package site.newkiz.mypageserver.entity.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.Getter;

@Getter
public class MypageRequest {

  private String nickname;
  private LocalDate birthday;
  private Integer school;
  private String gender;
  private Integer difficulty;
  private Integer characterId;
  private List<String> interests;
}
