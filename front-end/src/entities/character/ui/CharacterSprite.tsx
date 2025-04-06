import React, { useRef, useState, useEffect } from "react"
import { SpriteAnimation } from "./SpriteAnimation"
import { useThree, useFrame } from "@react-three/fiber"
import { CharacterSpriteProps } from "../model/types"
import * as THREE from "three"
import { calculateCharacterBoundaries } from "@/entities/character"
import { Html } from "@react-three/drei"
import { Position } from "@/features/game/model/types"

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({ characterName, joystickData, tileMapSize, initialPosition, userId, sendMove, nickname, setMapBoundaries }) => {
  // state
  const [position, setPosition] = useState<[number, number, number]>(initialPosition)
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [direction, setDirection] = useState<number>(1)
  const [texturesLoaded, setTexturesLoaded] = useState<boolean>(false)
  // ref
  const characterRef = useRef<THREE.Group>(null)
  const frameCount = useRef(0)
  const lastSentPosition = useRef<[number, number]>([initialPosition[0], initialPosition[1]])
  const lastMovementTime = useRef<number>(0)
  // constants
  const FRAME_INTERVAL = 3;
  const POSITION_THRESHOLD = 0.05;
  const LERP_FACTOR = 0.15

  const isLocalPlayer = Boolean(joystickData)
  const isOtherPlayer = !isLocalPlayer && userId !== undefined
  const { viewport } = useThree()
  const SPEED = 5
  const characterSize = { width: 1, height: 1 }

  const imgUrl = import.meta.env.VITE_AWS_S3_BASE_URL;

  const textureIdlePath = `${imgUrl}dinoset/${characterName}/base/idle.png`
  const textureMovePath = `${imgUrl}dinoset/${characterName}/base/move.png`

  // 경계값 계산 후 WebSocket 훅에 전달
  const boundaries = React.useMemo(() => {
    const calculatedBoundaries = calculateCharacterBoundaries(
      viewport, 
      characterSize, 
      tileMapSize
    );
    
    // 계산된 경계값을 WebSocket 훅에 전달
    if (setMapBoundaries) {
      setMapBoundaries(calculatedBoundaries);
    }
    
    return calculatedBoundaries;
  }, [viewport.width, viewport.height, characterSize.width, characterSize.height, tileMapSize.width, tileMapSize.height, setMapBoundaries]);

  // 조이스틱 데이터 변경 시 캐릭터 상태 업데이트
  useEffect(() => {
    if(!joystickData) return;
    setIsMoving(joystickData.isMoving)
    if (joystickData.isMoving && joystickData.x !== 0) {
      setDirection(joystickData.x < 0 ? -1 : 1)
    }
  }, [joystickData?.isMoving, joystickData?.x])

  // 다른 유저들 좌표 변화 탐지
  useEffect(() => {
    if (isOtherPlayer && initialPosition) {
      // 방향감지
      if (initialPosition[0] !== position[0]) {
        setDirection(initialPosition[0] > position[0] ? -1 : 1)
      }
      
      // 움직인 거리 계산
      const dx = initialPosition[0] - position[0]
      const dy = initialPosition[1] - position[1]
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // 일정 거리 이상 움직여야 상태 변경
      setIsMoving(distance > 0.01)
    }
  }, [initialPosition, isOtherPlayer, position])

  // 프레임 별 처리
  useFrame((_, delta) => {
    const currentTime = Date.now()
    
    // 로컬 유저 움직임 처리
    if (isLocalPlayer && joystickData) {
      const [x, y, z] = position
      let newX = x
      let newY = y
      
      if (joystickData.isMoving) {
        // 새로운 좌표
        newX += joystickData.x * SPEED * delta
        newY += joystickData.y * SPEED * delta
        
        // 바운더리 적용
        newX = Math.max(boundaries.minX, Math.min(newX, boundaries.maxX))
        newY = Math.max(boundaries.minY, Math.min(newY, boundaries.maxY))
        
        setPosition([newX, newY, z])
        
        // 쓰로틀링 설정
        frameCount.current++
        const [lastX, lastY] = lastSentPosition.current
        const movedDistance = Math.sqrt(Math.pow(newX - lastX, 2) + Math.pow(newY - lastY, 2))
        
        // 정해진 만큼 이동해야 전송
        if (sendMove && userId && 
            (frameCount.current % FRAME_INTERVAL === 0 || 
             movedDistance > POSITION_THRESHOLD ||
             currentTime - lastMovementTime.current > 100)) {
          
          lastSentPosition.current = [newX, newY]
          lastMovementTime.current = currentTime
          
          const positionData: Position = {
            direction,
            x: newX,
            y: newY
          }
          
          sendMove(userId, characterName, positionData)
        }
      } 
      // 움직이다가 멈추면 전송
      else if (isMoving) {
        setIsMoving(false)
        
        if (sendMove && userId) {
          const positionData: Position = {
            direction,
            x: position[0],
            y: position[1]
          }
          sendMove(userId, characterName, positionData)
        }
      }
    }
    // 다른 유저 움직임 처리
    else if (isOtherPlayer) {
      const [x, y, z] = position
      const [targetX, targetY, _] = initialPosition
      
      // 선형 보간법 적용
      const newX = x + (targetX - x) * LERP_FACTOR
      const newY = y + (targetY - y) * LERP_FACTOR
      
      // 일정 거리 이상 움직여야 처리
      if (Math.abs(newX - x) > 0.001 || Math.abs(newY - y) > 0.001) {
        setPosition([newX, newY, z])
      }
    }
  })

  // 스프라이트 이미지 프리로딩 처리(재렌더링 방지)
  useEffect(() => {
    // 메모리에 프리로딩
    const textureLoader = new THREE.TextureLoader() // textureLoader 인스턴스 생성
    let loadedCount = 0 // 로드된 텍스처 개수

    const onLoad = () => {
      // 로드가 되면 로드 카운트 +1
      loadedCount += 1
      if (loadedCount === 2) {
        // 두 개의 텍스처가 모두 로드되었을 때
        setTexturesLoaded(true)
      }
    }

    const idleTexture = textureLoader.load(textureIdlePath, onLoad) // idleTexture 로드
    const moveTexture = textureLoader.load(textureMovePath, onLoad) // moveTexture 로드

    // 컴포넌트 언마운트 시 메모리 정리
    return () => {
      idleTexture.dispose()
      moveTexture.dispose()
    }
  }, [textureIdlePath, textureMovePath])

  // 디버깅용 로그
  // useEffect(() => {
  //   console.log("boundaries minX: ", boundaries.minX, "\n boundaries maxX: ", boundaries.maxX)
  // }, [boundaries])

  // useEffect(() => {
  //   if (isMoving) {
  //     console.log(new Date())
  //     console.log("isMoving 변화 \n x: ", position[0], "\n y: ", position[1])
  //   }
  // }, [position])

  return (
    <group ref={characterRef} position={position}>
      {texturesLoaded && (
        <>
          {!isMoving && <SpriteAnimation texturePath={textureIdlePath} frameWidth={24} totalWidth={72} frameCount={3} frameTime={200} direction={direction} />}
          {isMoving && <SpriteAnimation texturePath={textureMovePath} frameWidth={24} totalWidth={144} frameCount={6} frameTime={100} direction={direction} />}

          {/* 닉네임 표시 - Html 컴포넌트 사용 */}
          <Html position={[0, -0.6, 0]} center style={{userSelect: 'none', zIndex: 1, position:'relative'}}>
            <div style={{ color: 'white', background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '3px', whiteSpace: 'nowrap', zIndex:'50' }}>
              {nickname}
            </div>
          </Html>
        </>
      )}
    </group>
  )
}
