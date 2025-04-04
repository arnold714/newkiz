package site.newkiz.gameserver.entity.enums;

import lombok.Getter;

@Getter
public enum Direction {
  EAST(1), WEST(-1);

  private final int value;

  Direction(int i) {
    this.value = i;
  }
}
