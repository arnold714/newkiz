import React, { useRef, useState, useEffect } from "react"
import { SpriteAnimation } from "./SpriteAnimation"
import { useThree, useFrame } from "@react-three/fiber"
import { CharacterSpriteProps } from "../model/types"
import * as THREE from "three"
import { calculateCharacterBoundaries } from "@/entities/character"
import { Html } from "@react-three/drei"
import { useAppSelector } from "@/app/redux/hooks"

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  characterName,
  joystickData,
  tileMapSize,
  initialPosition,
  userId,
  sendMove,
  nickname,
  setMapBoundaries,
  quizResult,
  onPlayerRemove,
  isLocal
}) => {
  // state
  const [position, setPosition] = useState<[number, number, number]>(initialPosition)
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [direction, setDirection] = useState<number>(1)
  const [texturesLoaded, setTexturesLoaded] = useState<boolean>(false)
  const [isDead, setIsDead] = useState<boolean>(false)
  const [deathAnimationComplete, setDeathAnimationComplete] = useState<boolean>(false)
  // ref
  const characterRef = useRef<THREE.Group>(null)
  const frameCount = useRef(0)
  const lastSentPosition = useRef<[number, number]>([initialPosition[0], initialPosition[1]])
  const lastMovementTime = useRef<number>(0)
  // constants
  const FRAME_INTERVAL = 3
  const POSITION_THRESHOLD = 0.05
  const LERP_FACTOR = 0.15

  // 움직임이 금지된 상태인지 확인
  const movementProhibition = useAppSelector((state) => state.game.movementProhibition)

  const { viewport } = useThree()
  const SPEED = 5
  const characterSize = { width: 1, height: 1 }

  const imgUrl = import.meta.env.VITE_AWS_S3_BASE_URL

  const textureIdlePath = `${imgUrl}dinoset/${characterName}/base/idle.png`
  const textureMovePath = `${imgUrl}dinoset/${characterName}/base/move.png`
  const textureDeadPath = `${imgUrl}dinoset/${characterName}/base/dead.png`

  // 경계값 계산 후 WebSocket 훅에 전달
  const boundaries = React.useMemo(() => {
    const calculatedBoundaries = calculateCharacterBoundaries(viewport, characterSize, tileMapSize)

    // 계산된 경계값을 WebSocket 훅에 전달
    if (setMapBoundaries) {
      setMapBoundaries(calculatedBoundaries)
    }

    return calculatedBoundaries
  }, [viewport.width, viewport.height, characterSize.width, characterSize.height, tileMapSize.width, tileMapSize.height, setMapBoundaries])

  const handleDeathAnimationComplete = () => {
    setDeathAnimationComplete(true)
  }

  // 조이스틱 데이터 변경 시 캐릭터 상태 업데이트
  useEffect(() => {
    if (!joystickData || isDead || !isLocal) return

    const isJoystickMoving = joystickData.isMoving
    setIsMoving(isJoystickMoving)

    if (isJoystickMoving && joystickData.x !== 0) {
      setDirection(joystickData.x < 0 ? -1 : 1)
    }
  }, [joystickData, isDead])

  // 다른 유저들 좌표 변화 탐지
  useEffect(() => {
    if (!isLocal && initialPosition) {
      // 방향감지
      if (initialPosition[0] !== position[0]) {
        setDirection(initialPosition[0] > position[0] ? -1 : 1)
      }

      // 움직인 거리 계산 (Math.hypot <- 피타고라스 정리 계산 = 유클리드 거리 계산)
      const distance = Math.hypot(initialPosition[0] - position[0], initialPosition[1] - position[1])

      // 일정 거리 이상 움직여야 상태 변경
      setIsMoving(distance > 0.01)
    }
  }, [initialPosition, isLocal, position])

  // 프레임 별 처리
  useFrame((_, delta) => {
    if (movementProhibition) {
      setIsMoving(false)
      return
    }
    const currentTime = Date.now()

    // 로컬 유저 움직임 처리
    if (isLocal && joystickData && joystickData.isMoving) {
      const [x, y, z] = position
      // 새로운 좌표 계산
      const newX = Math.max(boundaries.minX, Math.min(x + joystickData.x * SPEED * delta, boundaries.maxX))
      const newY = Math.max(boundaries.minY, Math.min(y + joystickData.y * SPEED * delta, boundaries.maxY))

      setPosition([newX, newY, z])

      // 서버에 위치 전송 조건 확인
      frameCount.current++
      const [lastX, lastY] = lastSentPosition.current
      const movedDistance = Math.hypot(newX - lastX, newY - lastY)
      const shouldSendPosition = frameCount.current % FRAME_INTERVAL === 0 || movedDistance > POSITION_THRESHOLD || currentTime - lastMovementTime.current > 100

      // 서버에 위치 전송
      if (sendMove && userId !== undefined && shouldSendPosition) {
        lastSentPosition.current = [newX, newY]
        lastMovementTime.current = currentTime

        sendMove(userId, characterName, {
          direction,
          x: newX,
          y: newY,
        })
      }
      // 움직이다가 멈추면 전송
      else if (isLocal && isMoving && !joystickData?.isMoving) {
        setIsMoving(false)

        if (sendMove && userId !== undefined) {
          sendMove(userId, characterName, {
            direction,
            x: position[0],
            y: position[1],
          })
        }
      }
    }
    // 다른 유저 움직임 처리
    else if (!isLocal) {
      const [x, y, z] = position
      const [targetX, targetY] = initialPosition

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
    const totalTextures = 3

    const onLoad = () => {
      // 로드가 되면 로드 카운트 +1
      loadedCount += 1
      if (loadedCount === totalTextures) {
        // 두 개의 텍스처가 모두 로드되었을 때
        setTexturesLoaded(true)
      }
    }

    const textures = [
      textureLoader.load(textureIdlePath, onLoad), // idleTexture 로드
      textureLoader.load(textureMovePath, onLoad), // moveTexture 로드
      textureLoader.load(textureDeadPath, onLoad), // deadTexture 로드
    ]

    // 컴포넌트 언마운트 시 메모리 정리
    return () => {
      textures.forEach((texture) => texture.dispose())
    }
  }, [textureIdlePath, textureMovePath, textureDeadPath])

  // 퀴즈 탈락 애니메이션 처리
  useEffect(() => {
    console.log("퀴즈 결과:", quizResult);
    
    if (!userId || !quizResult || !quizResult.wrongPlayers) {
      console.log("유저 아이디 || 퀴즈 결과 || 틀린 플레이어가 없음", { userId, quizResult });
      return;
    }
  
    console.log("Wrong players array:", quizResult.wrongPlayers);
    
    // 탈락한 플레이어인지 확인
    if (quizResult.wrongPlayers.includes(userId)) {
      console.log(`Player ${userId} has been eliminated`);
      setIsDead(true);
      setIsMoving(false); // 움직임 즉시 중단
      console.log(userId, " 탈락.");
  
      // 이미 죽은 상태에서 다시 리셋되지 않도록 처리
      setDeathAnimationComplete(false);
    }
  }, [quizResult, userId]);

  // 퀴즈 탈락 유저 처리
  useEffect(() => {
    if (isDead && deathAnimationComplete && onPlayerRemove && userId !== undefined) {
      const timer = setTimeout(() => {
        onPlayerRemove(userId)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isDead, deathAnimationComplete, onPlayerRemove, userId])

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
          {isDead ? (
            <SpriteAnimation
              texturePath={textureDeadPath}
              frameWidth={24}
              totalWidth={120}
              frameCount={5}
              frameTime={200}
              direction={direction}
              loop={false}
              onAnimationComplete={handleDeathAnimationComplete}
            />
          ) : (
            <>
              {!isMoving && <SpriteAnimation texturePath={textureIdlePath} frameWidth={24} totalWidth={72} frameCount={3} frameTime={200} direction={direction} />}
              {isMoving && <SpriteAnimation texturePath={textureMovePath} frameWidth={24} totalWidth={144} frameCount={6} frameTime={100} direction={direction} />}
            </>
          )}

          {/* 닉네임 표시 - Html 컴포넌트 사용 */}
          <Html position={[0, -0.6, 0]} center style={{ userSelect: "none", zIndex: 1, position: "relative" }}>
            <div style={{ color: "white", background: "rgba(0,0,0,0.5)", padding: "2px 5px", borderRadius: "3px", whiteSpace: "nowrap", zIndex: "50" }}>{nickname}</div>
          </Html>
        </>
      )}
    </group>
  )
}
