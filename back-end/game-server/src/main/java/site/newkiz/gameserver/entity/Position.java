package site.newkiz.gameserver.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import site.newkiz.gameserver.entity.enums.Direction;

@Data
@AllArgsConstructor
public class Position{
  private Direction direction;
  private float x;
  private float y;
}
