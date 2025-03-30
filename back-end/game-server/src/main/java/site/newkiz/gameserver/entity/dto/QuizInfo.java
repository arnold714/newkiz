package site.newkiz.gameserver.entity.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class QuizInfo {

  private int quizNumber;
  private String question;
  private int timeLeft;
}
