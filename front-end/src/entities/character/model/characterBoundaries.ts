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

/* 
// 타일맵 크기 계산 (예: Grass.png 타일맵)
const tileMapSize = {
  width: 8 * 16, // mapWidth * tileSize (8 타일 * 16픽셀)
  height: 6 * 16 // mapHeight * tileSize (6 타일 * 16픽셀)
};

// 카메라와 뷰포트 정보 가져오기
const { camera, viewport } = useThree();

// 캐릭터 크기 설정
const characterSize = { width: 1, height: 1 };

// 경계 계산
const boundaries = calculateCharacterBoundaries(
  camera as THREE.OrthographicCamera,
  viewport,
  characterSize,
  tileMapSize
);

// 경계 내로 위치 제한
const newX = Math.max(boundaries.minX, Math.min(position.x, boundaries.maxX));
const newY = Math.max(boundaries.minY, Math.min(position.y, boundaries.maxY));
*/