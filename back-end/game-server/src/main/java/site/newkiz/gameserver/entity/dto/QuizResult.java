package site.newkiz.gameserver.entity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class QuizResult {

  private int quizNumber;
  private String question;
  private boolean answer;
  private String explanation;
  private boolean result;
  private int score;
}
