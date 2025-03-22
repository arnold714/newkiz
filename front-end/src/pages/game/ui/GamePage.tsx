// src/pages/GamePage/ui/GamePage.tsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { CharacterSprite } from '@entities/character';
import { TileMap, grassMapData, waterMapData, biomeData  } from '@entities/tilemap';
import { JoystickController } from '@entities/joystick';
import { useCharacterMovementSetup, CharacterMovementController } from '@/features/CharacterMovement';
import { CharacterMovementState } from '@/features/CharacterMovement/model/types';

export const GamePage: React.FC = () => {
  // Canvas 외부에서 관리할 상태
  const { joystickData, handleJoystickMove, handleJoystickStop } = useCharacterMovementSetup();
  const [characterState, setCharacterState] = useState<CharacterMovementState>({
    position: [0, 0, 0],
    isMoving: false,
    direction: 1
  });
  
  // 타일맵 크기 계산 (맵 데이터 기반)
  const tileMapSize = {
    width: 200, // 가장 넓은 맵의 너비
    height: 120 // 가장 높은 맵의 높이
  };
  
  return (
    <div className="relative w-full h-full">
      <Canvas>
        <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={100} />
        <ambientLight intensity={1} />
        <React.Suspense fallback={null}>
          <TileMap 
            tilesetPath="/Water.png"
            tileSize={16}
            mapWidth={20}
            mapHeight={12}
            tileData={waterMapData}
          />
          <TileMap 
            tilesetPath="/Grass.png"
            tileSize={16}
            mapWidth={8}
            mapHeight={6}
            tileData={grassMapData}
          />
          <TileMap 
            tilesetPath="/Basic_Grass_Biom_things.png"
            tileSize={16}
            mapWidth={20}
            mapHeight={12}
            tileData={biomeData}
          />
          <CharacterSprite 
            characterName='kuro'
            position={characterState.position}
            isMoving={characterState.isMoving}
            direction={characterState.direction}
          />
          
          {/* 캐릭터 이동 로직 - Canvas 내부에서 실행 */}
          <CharacterMovementController 
            tileMapSize={tileMapSize}
            joystickData={joystickData}
            onMovementChange={setCharacterState}
          />
        </React.Suspense>
      </Canvas>
      
      <JoystickController 
        onMove={handleJoystickMove}
        onStop={handleJoystickStop}
      />
      
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '20px', 
        color: 'black',
        zIndex: 10
      }}>
        방향키, WASD 또는 조이스틱으로 캐릭터를 움직이세요
      </div>
    </div>
  );
};
