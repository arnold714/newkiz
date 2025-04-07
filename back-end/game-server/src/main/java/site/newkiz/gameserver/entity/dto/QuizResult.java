package site.newkiz.gameserver.entity.dto;

import java.util.List;
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
  private List<Integer> correctPlayers;
  private List<Integer> wrongPlayers;
}
