package site.newkiz.gameserver.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class GameUserScore {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private int userId;
  private int totalScore;

  public GameUserScore(int userId, int totalScore) {
    this.userId = userId;
    this.totalScore = totalScore;
  }

  public void addScore(int score) {
    totalScore += score;
  }
}