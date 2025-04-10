package site.newkiz.gameserver.entity;

import java.time.ZoneId;
import java.time.ZonedDateTime;
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

  // 시작 시간 - 단위 분
  private int startMinute;

  // 전체 퀴즈 정보
  private List<GameQuiz> gameQuizList;

  // 현재 퀴즈
  private int currentQuizNumber;

  // 참여 플레이어
  private Map<Integer, Player> players;

  // 현재 생존 플레이어
  private Map<Integer, Player> alivePlayers;


  public Game() {
    // todo 5분마다 실행될 때 기준
    ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
    this.startMinute = now.getMinute() + 3;
    this.state = State.WAITING;
    this.gameQuizList = new ArrayList<>();
    this.currentQuizNumber = 0;
    this.players = new ConcurrentHashMap<>();
    this.alivePlayers = new ConcurrentHashMap<>();
  }

  public void registerPlayer(int userId, Player player) {
    players.put(userId, player);
    alivePlayers.put(userId, player);
  }

  public int quizCount() {
    return this.gameQuizList.size();
  }

  public GameQuiz getCurrnetQuiz() {
    return this.gameQuizList.get(this.currentQuizNumber - 1);
  }

  public static Map<String, Object> toPlayingGameInfo(Game game) {
    Map<String, Object> result = new HashMap<>();
    result.put("state", game.getState());
    result.put("timeLeft", 5);

    return result;
  }

  public static Map<String, Object> toFinishedGameInfo(Game game,
      Map<Integer, List<GameScore>> scoreRank) {
    Map<String, Object> result = new HashMap<>();
    result.put("state", game.getState());
    result.put("scoreRank", scoreRank);

    return result;
  }
}
