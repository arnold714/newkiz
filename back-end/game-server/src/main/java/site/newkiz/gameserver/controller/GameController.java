package site.newkiz.gameserver.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import site.newkiz.gameserver.entity.Player;
import site.newkiz.gameserver.service.GameService;

@Controller
@RequiredArgsConstructor
public class GameController {

  private final GameService gameService;

  @MessageMapping("/connect/users/{userId}")
  public void connect(@DestinationVariable Integer userId) {
    gameService.joinGame(userId);
  }

  @MessageMapping("/move")
  public void move(Player player) {
    gameService.move(player);
  }
}
