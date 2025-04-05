package site.newkiz.gameserver.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import site.newkiz.gameserver.entity.Game;
import site.newkiz.gameserver.entity.Player;
import site.newkiz.gameserver.entity.Position;
import site.newkiz.gameserver.entity.Quiz;
import site.newkiz.gameserver.entity.dto.ConnectGameInfo;
import site.newkiz.gameserver.entity.dto.QuizInfo;
import site.newkiz.gameserver.entity.dto.QuizResult;
import site.newkiz.gameserver.entity.enums.Direction;
import site.newkiz.gameserver.entity.enums.State;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

  private final SimpMessagingTemplate messagingTemplate;
  private Game game;
  private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);


  @Scheduled(cron = "0 55 17 * * ?")
  public void createGame() throws InterruptedException {
    log.info("게임 생성");

    // 게임 생성 및 퀴즈 세팅
    game = new Game();
    game.setQuizList(getTodayQuizList());
  }

  public List<Quiz> getTodayQuizList() {
    log.info("퀴즈 세팅");

    List<Quiz> quizList = new ArrayList<>();
    // todo 임의 퀴즈 세팅
    for (int i = 1; i <= 10; i++) {
      quizList.add(new Quiz("Q" + i + ". 퀴즈 질문", true, "해설"));
    }
    return quizList;
  }

  public void joinGame(Integer userId) {
    // 유저 정보 조회 - 닉네임, 캐릭 정보
    Position position = new Position(Direction.EAST.getValue(), 0, 0);
    Player player = new Player(userId, "nickname", "KURO", position);

    // 플레이어 리스트에 유저 등록
    game.registerPlayer(player.getId(), player);

    // 게임 정보 전송 - 게임 상태 / 남은 대기 시간 / 다른 플레이어들 정보
    messagingTemplate.convertAndSend("/sub/users/" + userId + "/info", new ConnectGameInfo(game));
  }

  public void movePlayer(Player player) {
    // 움직인 유저 좌표 최신화
    Player movedPlayer = game.getAlivePlayers().get(player.getId());
    movedPlayer.setPosition(player.getPosition());

    // 모든 유저에게 공유
    messagingTemplate.convertAndSend("/sub/move", movedPlayer);
  }

  @Scheduled(cron = "0 0 18 * * ?")
  public void startGame() throws InterruptedException {
    log.info("게임 시작 - 총 " + game.quizCount() + " 문제");

    // 게임 상태 PLAYING 으로 변경
    game.setState(State.PLAYING);

    // 게임 시작 메시지 send
    messagingTemplate.convertAndSend("/sub/game-info", Game.toPlayingGameInfo(game));

    // 게임의 퀴즈 수 만큼 진행
    for (int currentQuizNumber = 1; currentQuizNumber <= game.quizCount(); currentQuizNumber++) {
      log.info("현재 문제 번호: " + currentQuizNumber);
      // 현재 문제
      game.setCurrentQuizNumber(currentQuizNumber);
      Quiz quiz = game.getCurrnetQuiz();

      // 현재 문제 정보 send
      messagingTemplate.convertAndSend("/sub/quiz-info",
          new QuizInfo(currentQuizNumber, quiz.getQuestion(), quiz.getTimeLeft()));

      // 퀴즈 시간 만큼 대기
      Thread.sleep(quiz.getTimeLeft());

      // 정답 판정
      log.info(currentQuizNumber + " 번 문제 정답: ~~~");
      QuizResult quizResult = checkAnswers();
      messagingTemplate.convertAndSend("/sub/quiz-result", quizResult);

      Thread.sleep(3000);

      // todo 오답자 커넥션 끊어야하는데

      // todo 스코어 랭킹 관리

    }

    // todo 퀴즈 종료 스코어
    log.info("퀴즈 게임 종료");


  }

  public QuizResult checkAnswers() {
    Quiz quiz = game.getCurrnetQuiz();
    Map<Integer, Player> players = game.getAlivePlayers();
    List<Integer> correctPlayers = new ArrayList<>();
    List<Integer> wrongPlayers = new ArrayList<>();

    for (Player player : players.values()) {
      if ((quiz.isAnswer() && player.getPosition().getX() < 0)
          || (!quiz.isAnswer() && player.getPosition().getX() >= 0)) {
        correctPlayers.add(player.getId());
      } else {
        wrongPlayers.add(player.getId());
        players.remove(player.getId());
      }
    }

    return QuizResult.builder()
        .quizNumber(game.getCurrentQuizNumber())
        .question(quiz.getQuestion())
        .answer(quiz.isAnswer())
        .explanation(quiz.getExplanation())
        .correctPlayers(correctPlayers)
        .wrongPlayers(wrongPlayers)
        .build();
  }
}
