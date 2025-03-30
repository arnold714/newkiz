package site.newkiz.gameserver.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Data;
import site.newkiz.gameserver.entity.enums.State;

@Data
public class Game {

  // 게임 상태 - 대기 / 진행중 / 종료
  private State state;

  // 시작 시간 - 단위 시
  private int startHour;

  // 전체 퀴즈 정보
  private List<Quiz> quizList;

  // 현재 퀴즈
  private int currentQuizNumber;

  // 플레이어
  private Map<Integer, Player> players;


  public Game() {
    this.state = State.WAITING;
    // todo 임의로 18시 시작 지정
    this.startHour = 18;
    this.quizList = new ArrayList<>();
    this.currentQuizNumber = 0;
    this.players = new HashMap<>();
  }

  public int quizCount() {
    return this.quizList.size();
  }

  public Quiz getCurrnetQuiz() {
    return this.quizList.get(this.currentQuizNumber - 1);
  }

  public void setCurrentQuizNumber(int currentQuizNumber) {
    this.currentQuizNumber = currentQuizNumber - 1;
  }
}
