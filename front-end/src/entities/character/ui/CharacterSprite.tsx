import React, { useRef, useState, useEffect } from "react"
import { SpriteAnimation } from "./SpriteAnimation"
import { useThree, useFrame } from "@react-three/fiber"
import { CharacterSpriteProps } from "../model/types"
import * as THREE from "three"
import { calculateCharacterBoundaries } from "@/entities/character"

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({ characterName, joystickData, tileMapSize, initialPosition = [0, 0, 0] }) => {
  const [position, setPosition] = useState<[number, number, number]>(initialPosition)
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [direction, setDirection] = useState<number>(1)
  const [texturesLoaded, setTexturesLoaded] = useState<boolean>(false)
  const characterRef = useRef<THREE.Group>(null)

  const { viewport } = useThree()
  const SPEED = 5
  const characterSize = { width: 1, height: 1 }

  const textureIdlePath = `https://newkiz.s3.ap-northeast-2.amazonaws.com/dinoset/${characterName}/base/idle.png`
  const textureMovePath = `https://newkiz.s3.ap-northeast-2.amazonaws.com/dinoset/${characterName}/base/move.png`

  // 캐릭터가 움직일 수 있는 공간 계산
  const boundaries = React.useMemo(() => {
    return calculateCharacterBoundaries(viewport, characterSize, tileMapSize)
  }, [viewport.width, viewport.height, characterSize.width, characterSize.height, tileMapSize.width, tileMapSize.height])

  // 조이스틱 데이터 변경 시 캐릭터 상태 업데이트
  useEffect(() => {
    setIsMoving(joystickData.isMoving)
    if (joystickData.isMoving && joystickData.x !== 0) {
      setDirection(joystickData.x < 0 ? -1 : 1)
    }
  }, [joystickData.isMoving, joystickData.x])

  // 프레임 별 처리
  useFrame((_, delta) => {
    if (joystickData.isMoving) {
      let [x, y, z] = position

      x += joystickData.x * SPEED * delta
      y += joystickData.y * SPEED * delta

      x = Math.max(boundaries.minX, Math.min(x, boundaries.maxX))
      y = Math.max(boundaries.minY, Math.min(y, boundaries.maxY))

      setPosition([x, y, z])
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

  useEffect(() => {
    console.log("boundaries minX: ", boundaries.minX, "\n boundaries maxX: ", boundaries.maxX)
  }, [boundaries])

  useEffect(() => {
    if (isMoving) {
      console.log(new Date())
      console.log("x: ", position[0], "\n y: ", position[1])
    }
  }, [position])

  return (
    <group ref={characterRef} position={position}>
      {texturesLoaded && (
        <>
          {!isMoving && <SpriteAnimation texturePath={textureIdlePath} frameWidth={24} totalWidth={72} frameCount={3} frameTime={200} direction={direction} />}
          {isMoving && <SpriteAnimation texturePath={textureMovePath} frameWidth={24} totalWidth={144} frameCount={6} frameTime={100} direction={direction} />}
        </>
      )}
    </group>
  )
}
