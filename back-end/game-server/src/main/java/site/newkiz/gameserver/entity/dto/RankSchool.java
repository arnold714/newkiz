package site.newkiz.gameserver.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RankSchool {

  private int rank;
  private int schoolId;
  private String schoolName;
  private int totalScore;

}
