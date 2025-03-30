package site.newkiz.gameserver.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import site.newkiz.gameserver.entity.Game;
import site.newkiz.gameserver.entity.Player;
import site.newkiz.gameserver.entity.Position;
import site.newkiz.gameserver.entity.Quiz;
import site.newkiz.gameserver.entity.dto.ConnectGameInfo;
import site.newkiz.gameserver.entity.dto.QuizInfo;
import site.newkiz.gameserver.entity.enums.Direction;
import site.newkiz.gameserver.entity.enums.State;

@Service
@RequiredArgsConstructor
public class GameService {

  private final SimpMessagingTemplate messagingTemplate;
  private Game game;

  @Scheduled(cron = "0 55 17 * * ?")
  public void createGame() {
    // 게임 생성 및 퀴즈 세팅
    game = new Game();
    game.setQuizList(getTodayQuizList());
  }

  public List<Quiz> getTodayQuizList() {
    List<Quiz> quizList = new ArrayList<>();
    // todo 임의 퀴즈 세팅
    for (int i = 1; i <= 10; i++) {
      game.getQuizList().add(new Quiz("퀴즈 질문", true, "해설"));
    }
    return quizList;
  }

  public void joinGame(Integer userId) {
    // 유저 정보 조회 - 닉네임, 캐릭 정보
    Position position = new Position(Direction.EAST, 0, 0);
    Player player = new Player(userId, "nickname", "characterName", position);

    // 플레이어 리스트에 유저 등록
    game.getPlayers().put(player.getId(), player);

    // 게임 정보 전송 - 게임 상태 / 남은 대기 시간 / 다른 플레이어들 정보
    messagingTemplate.convertAndSend("/sub/users/" + userId + "/info", new ConnectGameInfo(game));
  }

  public void move(Player player) {
    // 움직인 유저 좌표 최신화
    Player movedPlayer = game.getPlayers().get(player.getId());
    movedPlayer.setPosition(player.getPosition());

    // 모든 유저에게 공유
    messagingTemplate.convertAndSend("/sub/move", movedPlayer);
  }

  @Scheduled(cron = "0 0 18 * * ?")
  public void startGame() throws InterruptedException {
    // 게임 상태 PLAYING 으로 변경
    game.setState(State.PLAYING);

    // todo 게임 시작 메시지 send

    // 게임의 퀴즈 수 만큼 진행
    for (int currentQuizNumber = 1; currentQuizNumber <= game.quizCount(); currentQuizNumber++) {

      // 현재 문제
      game.setCurrentQuizNumber(currentQuizNumber);
      Quiz quiz = game.getCurrnetQuiz();

      // 현재 문제 정보 send
      sendQuizInfo(currentQuizNumber, quiz);

      // todo 퀴즈 시간 만큼 대기
      Thread.sleep(10000);

      // todo 플레이어들 정답 판정, 오답자 스코어 정보 제공 및 나가기 or 관전 선택

      // todo 정답 판정 보여주는 시간만큼 대기
      Thread.sleep(3000);

      // todo 오답자 커넥션 끊어야하는데

      // todo 스코어 랭킹 관리

    }

    // todo 퀴즈 종료 스코어
  }

  public void sendQuizInfo(int quizNumber, Quiz quiz) {
    // 퀴즈 번호, 문제 내용, 문제 시간
    messagingTemplate.convertAndSend("/sub/quiz-info",
        new QuizInfo(quizNumber, quiz.getQuestion(), quiz.getTimeLeft()));
  }

  public void judgeAnswer(boolean answer, Game game) {
    Map<Integer, Player> players = game.getPlayers();
    for (Player player : players.values()) {

      messagingTemplate.convertAndSend("/sub/users/" + player.getId() + "/quiz-result", answer);
    }
  }

}
