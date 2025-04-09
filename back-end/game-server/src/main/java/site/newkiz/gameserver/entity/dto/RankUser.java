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
public class RankUser {

  private int rank;
  private int userId;
  private String nickname;
  private String characterId;
  private int totalScore;
}
