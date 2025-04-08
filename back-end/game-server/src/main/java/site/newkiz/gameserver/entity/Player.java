package site.newkiz.gameserver.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Player {

  private Integer id;
  private String nickname;
  private String characterName;
  private Position position;
  private int score;
  private School school;

  public Player(Integer id, String nickname, String characterName, Position position,
      School school) {
    this.id = id;
    this.nickname = nickname;
    this.characterName = characterName;
    this.position = position;
    this.score = 0;
    this.school = school;
  }

  public void addScore() {
    this.score++;
  }
}
