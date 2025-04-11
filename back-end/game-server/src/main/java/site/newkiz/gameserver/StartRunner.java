package site.newkiz.gameserver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import site.newkiz.gameserver.service.GameService;

@Component
@RequiredArgsConstructor
@Slf4j
public class StartRunner implements ApplicationRunner {

  private final GameService gameService;

  @Override
  public void run(ApplicationArguments args) throws InterruptedException {
    log.info("Game created");
    gameService.createGame();

    log.info("Game start after 10 seconds");
    Thread.sleep(10000);

    log.info("Game start!");
    gameService.startGame();

  }
}
