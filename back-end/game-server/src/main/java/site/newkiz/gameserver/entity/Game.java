package site.newkiz.gameserver.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
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

  // 참여 플레이어
  private Map<Integer, Player> players;

  // 현재 생존 플레이어
  private Map<Integer, Player> alivePlayers;


  public Game() {
    this.state = State.WAITING;
    // todo 임의로 18시 시작 지정
    this.startHour = 18;
    this.quizList = new ArrayList<>();
    this.currentQuizNumber = 0;
    this.players = new ConcurrentHashMap<>();
    this.alivePlayers = new ConcurrentHashMap<>();
  }

  public void registerPlayer(int userId, Player player) {
    players.put(userId, player);
    alivePlayers.put(userId, player);
  }

  public int quizCount() {
    return this.quizList.size();
  }

  public Quiz getCurrnetQuiz() {
    return this.quizList.get(this.currentQuizNumber - 1);
  }

  public static Map<String, Object> toPlayingGameInfo(Game game) {
    Map<String, Object> result = new HashMap<>();
    result.put("state", game.getState());
    result.put("timeLeft", 5);

    return result;
  }

  public static Map<String, Object> toFinishedGameInfo(Game game, List<GameScore> gameScoreList) {
    Map<String, Object> result = new HashMap<>();
    result.put("state", game.getState());
    result.put("scoreList", gameScoreList);

    return result;
  }
}
