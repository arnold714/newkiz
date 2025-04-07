package site.newkiz.gameserver.entity;

import lombok.Data;

@Data
public class Quiz {

  // 문제 질문
  private String question;

  // 정답
  private boolean answer;

  // 해설
  private String explanation;

  // 문제 푸는 시간 (초 단위)
  private int timeLeft;

  public Quiz(String question, boolean answer, String explanation) {
    this.question = question;
    this.answer = answer;
    this.explanation = explanation;
    this.timeLeft = 10;
  }
}
