package site.newkiz.gameserver.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import site.newkiz.gameserver.entity.Game;
import site.newkiz.gameserver.entity.GameSchoolScore;
import site.newkiz.gameserver.entity.GameScore;
import site.newkiz.gameserver.entity.GameUserScore;
import site.newkiz.gameserver.entity.Player;
import site.newkiz.gameserver.entity.Position;
import site.newkiz.gameserver.entity.Profile;
import site.newkiz.gameserver.entity.Quiz;
import site.newkiz.gameserver.entity.dto.ConnectGameInfo;
import site.newkiz.gameserver.entity.dto.QuizInfo;
import site.newkiz.gameserver.entity.dto.QuizResult;
import site.newkiz.gameserver.entity.enums.Direction;
import site.newkiz.gameserver.entity.enums.State;
import site.newkiz.gameserver.repository.GameSchoolScoreRepository;
import site.newkiz.gameserver.repository.GameUserScoreRepository;
import site.newkiz.gameserver.repository.ProfileRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

  private final SimpMessagingTemplate messagingTemplate;
  private final GameUserScoreRepository gameUserScoreRepository;
  private final ProfileRepository profileRepository;
  private final GameSchoolScoreRepository gameSchoolScoreRepository;
  private Game game;

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
    Profile profile = profileRepository.findByUserId(userId).orElse(null);
    Position position = new Position(Direction.EAST.getValue(), 0.5f, 0);
    Player player = new Player(userId, profile.getNickname(), profile.getCharacterId(), position,
        profile.getSchool());

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

    // todo 게임 들어왔다 나갔을 경우 Players 에서 삭제해야함
    // 게임 상태 PLAYING 으로 변경 및 게임 시작 메시지 send
    game.setState(State.PLAYING);
    messagingTemplate.convertAndSend("/sub/game-info", Game.toPlayingGameInfo(game));
    Thread.sleep(5000);

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
      Thread.sleep(quiz.getTimeLeft() * 1000);

      // 정답 판정
      log.info(currentQuizNumber + " 번 문제 정답: ~~~");
      QuizResult quizResult = checkAnswers();
      messagingTemplate.convertAndSend("/sub/quiz-result", quizResult);

      Thread.sleep(5000);

      // 생존자 없으면 게임 종료
      if (game.getAlivePlayers().isEmpty()) {
        break;
      }
    }

    log.info("퀴즈 게임 종료");
    game.setState(State.FINISHED);
    List<GameScore> gameScoreList = new ArrayList<>();

    for (Player player : game.getPlayers().values()) {
      // 학교 점수 추가
      GameSchoolScore gameSchoolScore = gameSchoolScoreRepository.findBySchool(player.getSchool())
          .orElseGet(
              () -> gameSchoolScoreRepository.save(new GameSchoolScore(player.getSchool(), 0))
          );
      gameSchoolScore.addScore(player.getScore());
      gameSchoolScoreRepository.save(gameSchoolScore);

      // 유저 점수 추가
      GameUserScore gameUserScore = gameUserScoreRepository.findByUserId(player.getId()).orElseGet(
          () -> gameUserScoreRepository.save(new GameUserScore(player.getId(), 0))
      );
      gameUserScore.addScore(player.getScore());
      gameUserScoreRepository.save(gameUserScore);
      gameScoreList.add(
          new GameScore(player.getId(), player.getNickname(), player.getScore(),
              gameUserScore.getTotalScore()));
    }

    gameScoreList.sort(Comparator.comparingInt(GameScore::getScore).reversed());

    Map<Integer, List<GameScore>> scoreRank = new HashMap<>();

    if (!gameScoreList.isEmpty()) {
      int rank = 1;
      scoreRank.put(rank, new ArrayList<>());
      scoreRank.get(rank).add(gameScoreList.get(0));

      for (int i = 1; i < gameScoreList.size(); i++) {
        if (scoreRank.get(rank).get(0).getScore() > gameScoreList.get(i).getScore()) {
          rank++;
          scoreRank.put(rank, new ArrayList<>());
        }
        scoreRank.get(rank).add(gameScoreList.get(i));
      }
    }

    messagingTemplate.convertAndSend("/sub/game-info",
        Game.toFinishedGameInfo(game, scoreRank));
  }

  public QuizResult checkAnswers() {
    Quiz quiz = game.getCurrnetQuiz();
    Map<Integer, Player> players = game.getAlivePlayers();
    List<Integer> correctPlayers = new ArrayList<>();
    List<Integer> wrongPlayers = new ArrayList<>();

    for (Player player : players.values()) {
      if ((quiz.isAnswer() && player.getPosition().getX() < 0.5)
          || (!quiz.isAnswer() && player.getPosition().getX() >= 0.5)) {
        correctPlayers.add(player.getId());
        player.addScore();
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
