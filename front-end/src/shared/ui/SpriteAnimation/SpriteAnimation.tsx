import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface SpriteAnimationProps {
  texturePath: string;
  frameWidth: number;
  frameHeight: number;
  totalWidth: number;
  frameCount: number;
  frameTime?: number;
  direction: number;
}

export const SpriteAnimation: React.FC<SpriteAnimationProps> = ({
  texturePath,
  frameWidth,
  frameHeight,
  totalWidth,
  frameCount,
  frameTime = 150,
  direction,
}) => {
  const spriteRef = useRef<THREE.Sprite>(null);
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const timeRef = useRef(0);
  const frameRef = useRef(0);
  
  // 텍스처 설정
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  
  // 스프라이트 시트의 프레임 크기 계산
  const frameSize = new THREE.Vector2(
    frameWidth / totalWidth,
    1
  );
  
  // 텍스처 반복 설정
  texture.repeat.set(frameSize.x, frameSize.y);
  
  useFrame((_, delta) => {
    timeRef.current += delta * 1000;
    
    if (timeRef.current >= frameTime) {
      frameRef.current = (frameRef.current + 1) % frameCount;
      texture.offset.x = frameRef.current * frameSize.x;
      timeRef.current = 0;
    }
  });

  // 스프라이트 크기 설정 (픽셀 아트 스타일 유지를 위해 비율 조정)
  const baseScale = 1;
  const width = (frameWidth / 24) * baseScale;
  const height = baseScale;

  const xScale = width * (direction >= 0 ? 1 : -1);

  return (
    <sprite ref={spriteRef} scale={[xScale, height, 1]}>
      <spriteMaterial 
        map={texture} 
        transparent={true}
        alphaTest={0.1}
      />
    </sprite>
  );
};
