package site.newkiz.gameserver.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.newkiz.gameserver.entity.enums.Direction;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Position{
  private Direction direction;
  private float x;
  private float y;
}
