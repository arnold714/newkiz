import { useState, useRef, useEffect } from 'react';
import { calculateCharacterBoundaries } from '@/entities/character';
import { CharacterMovementState, CharacterMovementResult } from './types';
import { JoystickData } from '@/shared/types/joystick';

// Canvas 외부에서 사용할 수 있는 훅
export const useCharacterMovementSetup = (): {
  joystickData: JoystickData;
  handleJoystickMove: (event: any) => void;
  handleJoystickStop: () => void;
} => {
  const [joystickData, setJoystickData] = useState<JoystickData>({
    x: 0,
    y: 0,
    isActive: false
  });
  
  // 조이스틱 데이터 처리
  const handleJoystickMove = (event: any) => {
    const { x, y } = event;
    
    if (x !== null && y !== null) {
      setJoystickData({
        x,
        y,
        isActive: true
      });
    }
  };
  
  const handleJoystickStop = () => {
    setJoystickData({
      x: 0,
      y: 0,
      isActive: false
    });
  };

  return {
    joystickData,
    handleJoystickMove,
    handleJoystickStop
  };
};

// Canvas 내부에서 사용할 컴포넌트
import { useThree, useFrame } from '@react-three/fiber';

export const CharacterMovementController: React.FC<{
  tileMapSize: { width: number; height: number };
  joystickData: JoystickData;
  onMovementChange?: (state: CharacterMovementState) => void;
}> = ({ tileMapSize, joystickData, onMovementChange }) => {
  const [movementState, setMovementState] = useState<CharacterMovementState>({
    position: [0, 0, 0],
    isMoving: false,
    direction: 'right'
  });
  
  const keysPressed = useRef<Record<string, boolean>>({});
  const SPEED = 5;

  const { viewport } = useThree();

  // 캐릭터 크기 (스프라이트 크기에 맞게 조정)
  const characterSize = { width: 1, height: 1 };
  
  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
        setMovementState(prev => ({ ...prev, isMoving: true }));
      }
      
      // 방향 설정
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        setMovementState(prev => ({ ...prev, direction: 'left' }));
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        setMovementState(prev => ({ ...prev, direction: 'right' }));
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      delete keysPressed.current[e.code];
      
      // 모든 이동 키가 떼어졌는지 확인
      const movementKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyW', 'KeyA', 'KeyS', 'KeyD'];
      const isAnyMovementKeyPressed = movementKeys.some(key => keysPressed.current[key]);
      
      if (!isAnyMovementKeyPressed && !joystickData.isActive) {
        setMovementState(prev => ({ ...prev, isMoving: false }));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [joystickData.isActive]);
  
  // 조이스틱 데이터 변경 시 캐릭터 상태 업데이트
  useEffect(() => {
    if (joystickData.isActive) {
      setMovementState(prev => ({
        ...prev,
        isMoving: true,
        direction: joystickData.x < 0 ? 'left' : 'right'
      }));
    } else if (Object.keys(keysPressed.current).length === 0) {
      setMovementState(prev => ({ ...prev, isMoving: false }));
    }
  }, [joystickData]);
  
  useFrame((_, delta) => {
    let [x, y, z] = movementState.position;
    
    // 키보드 입력 처리
    if (keysPressed.current['ArrowLeft'] || keysPressed.current['KeyA']) x -= SPEED * delta;
    if (keysPressed.current['ArrowRight'] || keysPressed.current['KeyD']) x += SPEED * delta;
    if (keysPressed.current['ArrowUp'] || keysPressed.current['KeyW']) y += SPEED * delta;
    if (keysPressed.current['ArrowDown'] || keysPressed.current['KeyS']) y -= SPEED * delta;
    
    // 조이스틱 입력 처리
    if (joystickData.isActive) {
      x += joystickData.x * SPEED * delta;
      y += joystickData.y * SPEED * delta;
    }
    
    // 현재 경계 가져오기 - 타일맵 크기를 고려하여 계산
    const boundaries = calculateCharacterBoundaries(viewport, characterSize, tileMapSize);
    
    // 경계 내로 위치 제한
    x = Math.max(boundaries.minX, Math.min(x, boundaries.maxX));
    y = Math.max(boundaries.minY, Math.min(y, boundaries.maxY));
    
    const newMovementState = {
      ...movementState,
      position: [x, y, z] as [number, number, number]
    };
    
    setMovementState(newMovementState);
    
    // 상태 변경 콜백
    if (onMovementChange) {
      onMovementChange(newMovementState);
    }
  });

  return null; // 이 컴포넌트는 UI를 렌더링하지 않고 로직만 처리
};
