import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { SpriteAnimationProps } from '../model/types';

export const SpriteAnimation: React.FC<SpriteAnimationProps> = ({ 
  texturePath, // 캐릭터로 사용할 이미지
  frameWidth, // 프레임의 가로 크기
  totalWidth, // 전체 이미지의 가로 크기
  frameCount, // 총 프레임 수
  frameTime, // 한 프레임이 유지되는 시간
  direction, // 캐릭터 방향 (1: 오른쪽, -1: 왼쪽) 
}) => {
  // useLoader(THREE.TextureLoader)를 사용하여 이미지를 로드하는 훅
  // THREE.texture 객체 생성
  const spriteRef = useRef<THREE.Sprite>(null);  // 스프라이트 요소에 대한 참조를 저장할 ref
  const texture = useLoader(THREE.TextureLoader, texturePath); // 이미지의 텍스터 설정
  const timeRef = useRef<number>(0); // 프레임 시간을 추적하기 위한 ref
  const frameRef = useRef<number>(0); // 현재 프레임 인덱스를 저장하는 ref
  
  // 텍스처 설정
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  
  // 스프라이트 시트의 프레임 크기 계산
  const frameSize = new THREE.Vector2(
    frameWidth / totalWidth, // 한 프레임의 가로 비율
    1 // 전체 높이
  );

  // 텍스처 반복 설정
  texture.repeat.set(frameSize.x, frameSize.y);
  
  useFrame((_, delta) => { // 매 프레임마다 실행될 함수를 작성하는 훅
    timeRef.current += delta * 1000; // timeRef값에 1초 추가
    
    if (timeRef.current >= frameTime) {
      frameRef.current = (frameRef.current + 1) % frameCount;
      texture.offset.x = frameRef.current * frameSize.x;
      timeRef.current = 0;
    }

    // direction 값에 따라 텍스처 좌우반전
    texture.wrapS = THREE.RepeatWrapping;
    if (direction < 0) {
      texture.repeat.set(-frameSize.x, frameSize.y);
    } else {
      texture.repeat.set(frameSize.x, frameSize.y);
    }
  });

  // 스프라이트 크기 설정 (픽셀 아트 스타일 유지를 위해 비율 조정)
  const baseScale = 1;
  const width = (frameWidth / 24) * baseScale;
  const height = baseScale;

  return (
    <sprite ref={spriteRef} scale={[width, height, 1]}>
      <spriteMaterial 
        map={texture} 
        transparent={true}
      />
    </sprite>
  );
}
