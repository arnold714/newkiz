package site.newkiz.gameserver.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@ToString
public class GameSchoolScore {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne
  @JoinColumn(name = "school_id")
  private School school;

  private int totalScore;

  public GameSchoolScore(School school, int totalScore) {
    this.school = school;
    this.totalScore = totalScore;
  }

  public void addScore(int score) {
    totalScore += score;
  }
}