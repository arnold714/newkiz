import React, { useRef, useState, useEffect } from 'react';
import { SpriteAnimation } from './SpriteAnimation';
import { CharacterSpriteProps } from '../model/types';
import * as THREE from 'three';

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({ 
  characterName,
  position, 
  isMoving, 
  direction, 
}) => {
  const [texturesLoaded, setTexturesLoaded] = useState<boolean>(false); 
  const characterRef = useRef<THREE.Group>(null);

  const textureIdlePath = `https://newkiz.s3.ap-northeast-2.amazonaws.com/dinoset/${characterName}/base/idle.png`;
  const textureMovePath = `https://newkiz.s3.ap-northeast-2.amazonaws.com/dinoset/${characterName}/base/move.png`;

  // 이미지 프리로딩 처리
  useEffect(() => { // 메모리에 프리로딩
    const textureLoader = new THREE.TextureLoader(); // textureLoader 인스턴스 생성
    let loadedCount = 0; // 로드된 텍스처 개수
    
    const onLoad = () => { // 로드가 되면 로드 카운트 +1
      loadedCount += 1;
      if (loadedCount === 2) { // 두 개의 텍스처가 모두 로드되었을 때
        setTexturesLoaded(true);
      }
    };
  
    const idleTexture = textureLoader.load(textureIdlePath, onLoad); // idleTexture 로드
    const moveTexture = textureLoader.load(textureMovePath, onLoad); // moveTexture 로드
  
  
    // 컴포넌트 언마운트 시 메모리 정리
    return () => {
      idleTexture.dispose();
      moveTexture.dispose();
    };
  }, [textureIdlePath, textureMovePath]);

  return (
    <group ref={characterRef} position={position}>
      {texturesLoaded && (
        <>
          {!isMoving && (
            <SpriteAnimation 
              texturePath={textureIdlePath}
              frameWidth={24}
              totalWidth={72}
              frameCount={3}
              frameTime={200}
              direction={direction}
            />
          )}
          {isMoving && (
            <SpriteAnimation 
              texturePath={textureMovePath}
              frameWidth={24}
              totalWidth={144}
              frameCount={6}
              frameTime={100}
              direction={direction}
            />
          )}
        </>
      )}
    </group>
  );
};
