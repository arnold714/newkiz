package site.newkiz.gameserver.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Player {

  private Integer id;
  private String nickname;
  private String characterName;
  private Position position;

}
