package site.newkiz.gameserver.entity.dto;

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
    this.timeLeft = Math.max(game.getStartHour() - now.getHour(), 0);
    this.state = game.getState();
    this.players = game.getPlayers();
  }
}
