import React, { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrthographicCamera } from "@react-three/drei"
import { CharacterSprite } from "@entities/character"
import { TileMap, grassMapData, waterMapData, biomeData, newMapData } from "@entities/tilemap"
import { JoystickController } from "@entities/joystick"
import { calculateWScale } from "@/features/game"
import { JoystickData } from "@/shared/types/joystick"
import { useWebSocket } from "@/features/game/model/useWebSocket"
import { WaitingPage, QuestionComponent, GameResultComponent } from "@/entities/game"
import { GameResult } from "@/entities/character/model/types"

export const GamePage: React.FC = () => {
  const [joystickData, setJoystickData] = useState<JoystickData>({
    x: 0,
    y: 0,
    isMoving: false,
  })
  const [wScale, setWScale] = useState<number>(1)

  const connected = true

  const gameInfo = {
    state: "FINISHED",
    // "WAITING" "PLAYING" "FINISHED"
  }

  const currentQuiz = {
    quizNumber: 1,
    question: "프랑스의 수도는 파리이다.",
    timeLeft: 3,
  }

  const quizResult = {
    quizNumber: 1,
    question: "프랑스의 수도는 파리이다.",
    answer: false,
    explanation: "프랑스의 수도는 파리입니다.",
    result: true,
    score: 4,
  }

  const allPlayers = [
    { id: 2, characterName: "nico", position: { direction: 1, x: -1, y: -1 }, nickname: "Player1" },
    { id: 3, characterName: "kuro", position: { direction: -1, x: 2, y: -2 }, nickname: "Player2" },
  ]

  const rowData: GameResult[] = [
    { rank: 1, nickname: '타락파워전사', score: 120, totalScore: 450, rankChange: 2 },
    { rank: 2, nickname: '게임왕', score: 100, totalScore: 380, rankChange: -1 },
    { rank: 3, nickname: '실버맨', score: 90, totalScore: 320, rankChange: 0 },
    // 더 많은 데이터...
  ];

  // 임시 userId
  const userId = 1

  // WebSocket 연결
  const { sendMove } = useWebSocket(userId)
  // connected, gameInfo, allPlayers, currentQuiz, quizResult,
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
        {gameInfo && gameInfo.state === "WAITING" ? (
          <div className="absolute w-[80%] top-15 z-[1000] flex justify-center select-none">
            <WaitingPage />
          </div>
        ) : null}
        {gameInfo && gameInfo.state === "PLAYING" ? (
          <div className="absolute w-[80%] top-10 z-[1000] flex flex-col justify-center items-center opacity-90 select-none">
            <QuestionComponent questionNo={currentQuiz?.quizNumber} question={currentQuiz?.question} timeLeft={currentQuiz?.timeLeft} quizResult={quizResult} />
          </div>
        ) : null}
        {gameInfo && gameInfo.state === "FINISHED" ? (
          <div className="absolute w-[80%] top-10 z-[1000] flex flex-col justify-center items-center select-none">
            <GameResultComponent results={rowData} />
          </div>
        ) : null}

        <Canvas className="w-full z-10 relative">
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
            <CharacterSprite characterName="kuro" joystickData={joystickData} tileMapSize={tileMapSize} initialPosition={[0, 0, 5]} userId={userId} nickname={"타락파워전사"} sendMove={sendMove} />
            {connected &&
              allPlayers &&
              Object.values(allPlayers)
                .filter((player) => player.id !== userId) // 현재 사용자 제외
                .map((player) => (
                  <>
                    <CharacterSprite
                      key={player.id}
                      characterName={player.characterName}
                      joystickData={{ x: player.position.x, y: player.position.y, isMoving: false }} // 다른 플레이어는 로컬 조이스틱 사용 안함
                      tileMapSize={tileMapSize}
                      initialPosition={[player.position.x, player.position.y, 0]}
                      userId={player.id}
                      nickname={player.nickname}
                    />
                  </>
                ))}
          </React.Suspense>
        </Canvas>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
          <JoystickController onMove={handleJoystickMove} onStop={handleJoystickStop} />
        </div>
      </div>
    </div>
  )
}
