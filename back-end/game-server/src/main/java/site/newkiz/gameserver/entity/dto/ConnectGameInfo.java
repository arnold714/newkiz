package site.newkiz.gameserver.entity.dto;

import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.newkiz.gameserver.entity.Game;
import site.newkiz.gameserver.entity.Player;
import site.newkiz.gameserver.entity.enums.State;

@Data
@NoArgsConstructor
public class ConnectGameInfo {

  private State state;
  private int timeLeft;
  private Map<Integer, Player> players;

  public ConnectGameInfo(Game game) {
    ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
    ZonedDateTime nextGameTime = null;

    if (now.getMinute() < 30) {
      nextGameTime = now.withMinute(30).withSecond(0).withNano(0);
    } else {
      nextGameTime = now.plusHours(1).withMinute(0).withSecond(0).withNano(0);
    }

    this.timeLeft = (int) Duration.between(now, nextGameTime).getSeconds();
    this.state = game.getState();
    this.players = game.getPlayers();
  }
}
