import React, { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrthographicCamera } from "@react-three/drei"
import { CharacterSprite } from "@entities/character"
import { TileMap, grassMapData, waterMapData, biomeData, newMapData } from "@entities/tilemap"
import { JoystickController } from "@entities/joystick"
import { calculateWScale } from "@/features/game"
import { JoystickData } from "@/shared/types/joystick"
// import { WaitingPage, QuestionComponent } from "@/entities/game"

export const GamePage: React.FC = () => {
  const [joystickData, setJoystickData] = useState<JoystickData>({
    x: 0,
    y: 0,
    isMoving: false,
  })
  const [wScale, setWScale] = useState(1)

  // 조이스틱 데이터 처리
  const handleJoystickMove = (event: any) => {
    const { x, y } = event
    if (x !== null && y !== null) {
      setJoystickData({
        x,
        y,
        isMoving: true,
      })
    }
  }

  const handleJoystickStop = () => {
    setJoystickData({
      x: 0,
      y: 0,
      isMoving: false,
    })
  }

  // 너비 계산
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = Math.min(Math.max(window.innerWidth, 360), 600)
      setWScale(calculateWScale(currentWidth))
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const tileMapUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL

  // grassMapData의 크기 (크기는 타일의 갯수 = unit 수)
  const grassMapSize: number = 8

  // 타일맵 크기 (mapData의 grassMapData 기준 = 가로/세로 0.5~7.5까지만 이동 가능)
  const tileMapSize: { width: number; height: number } = {
    width: grassMapSize - 0.5,
    height: grassMapSize - 0.5,
  }

  // const question = " 마라톤은 42.195 Km를 달린다. 이 거리는 제1회 아테네 올림픽부터 채택된 것이다."

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center w-full h-full relative">
        {/* <div className="absolute w-[70%] top-15 z-99 flex justify-center">
          <WaitingPage />
        </div> */}
        {/* <div className="absolute w-[70%] top-10 z-99 flex flex-col justify-center items-center">
          <QuestionComponent questionNo={1} question={question} />
        </div> */}
        <Canvas className="w-full">
          <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={70} />
          <ambientLight intensity={1} />
          <React.Suspense fallback={null}>
            <TileMap tilesetPath={`${tileMapUrl}assets/Water.png`} tileSize={16} mapWidth={10} mapHeight={14} tileData={waterMapData} scale={1} wScale={wScale} />
            <TileMap tilesetPath={`${tileMapUrl}assets/Grass.png`} tileSize={16} mapWidth={grassMapSize} mapHeight={grassMapSize} tileData={grassMapData} scale={1} wScale={wScale} />
            <TileMap
              tilesetPath={`${tileMapUrl}assets/Tilled_Dirt.png`}
              tileSize={16}
              mapWidth={grassMapSize * 10}
              mapHeight={grassMapSize * 10}
              tileData={newMapData}
              scale={0.1}
              wScale={0.1 * wScale}
              hScale={0.1}
              color={"#97d258"}
            />
            <TileMap tilesetPath={`${tileMapUrl}assets/Basic_Grass_Biom_things.png`} tileSize={16} mapWidth={16} mapHeight={10} tileData={biomeData} scale={0.5} wScale={wScale} />
            <CharacterSprite characterName="kuro" joystickData={joystickData} tileMapSize={tileMapSize} initialPosition={[0, 0, 0]} />
            {/* 캐릭터 이동 로직 - Canvas 내부에서 실행(Canvas 외부에서 작동하면 에러 뜸)*/}
          </React.Suspense>
        </Canvas>
        <JoystickController onMove={handleJoystickMove} onStop={handleJoystickStop} />
      </div>
    </div>
  )
}
