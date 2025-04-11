import { Boundaries, Size } from '@/shared/types/common';

export const calculateCharacterBoundaries = (
  viewport: { width: number; height: number }, 
  characterSize: Size,
  tileMapSize: { width: number; height: number }
): Boundaries => {
  // 뷰포트 크기와 타일맵 크기 중 작은 값을 사용하여 경계 계산
  const effectiveWidth = Math.min(viewport.width, tileMapSize.width);
  const effectiveHeight = Math.min(viewport.height, tileMapSize.height);
  
  // 타일맵이 뷰포트보다 작을 경우 타일맵 중심을 기준으로 경계 계산
  return {
    minX: -effectiveWidth / 2 + characterSize.width / 2,
    maxX: effectiveWidth / 2 - characterSize.width / 2,
    minY: -effectiveHeight / 2 + characterSize.height / 2,
    maxY: effectiveHeight / 2 - characterSize.height / 2
  };
};

