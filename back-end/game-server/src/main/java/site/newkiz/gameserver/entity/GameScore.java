package site.newkiz.gameserver.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameScore {

  private int userId;
  private int score;
  private int totalScore;

}
