import { Position } from "@/features/game/model/types";
import { Boundaries } from "@/shared/types/common";

// utils/normalization.ts
export const normalizePosition = (
    position: Position, 
    boundaries: Boundaries
  ): Position => {
    // 현재 위치를 0~1 사이의 값으로 정규화
    return {
      x: (position.x - boundaries.minX) / (boundaries.maxX - boundaries.minX),
      y: (position.y - boundaries.minY) / (boundaries.maxY - boundaries.minY),
      direction: position.direction
    };
  };
  
  export const denormalizePosition = (
    normalizedPosition: Position, 
    boundaries: Boundaries
  ): Position => {
    // 정규화된 위치(0~1)를 실제 맵 좌표로 변환
    return {
      x: normalizedPosition.x * (boundaries.maxX - boundaries.minX) + boundaries.minX,
      y: normalizedPosition.y * (boundaries.maxY - boundaries.minY) + boundaries.minY,
      direction: normalizedPosition.direction
    };
  };
  