import { useState, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrthographicCamera } from "@react-three/drei"
import { CharacterSprite } from "@entities/character"
import { TileMap, grassMapData, waterMapData, biomeData, newMapData } from "@entities/tilemap"
import { JoystickController } from "@entities/joystick"
import { calculateWScale } from "@/features/game"
import { JoystickData } from "@/shared/types/joystick"
import { useWebSocket } from "@/features/game/model/useWebSocket"
import { WaitingPage, QuestionComponent, GameResultComponent } from "@/entities/game"
import { Player, State } from "@/features/game/model/types"
import { GameResult } from "@/entities/character/model/types"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks"
import { setMovementProhibition } from "@/features/game/model/gameSlice"
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick"

export const GamePage: React.FC = () => {
  const [joystickData, setJoystickData] = useState<JoystickData>({
    x: 0,
    y: 0,
    isMoving: false,
  })
  const [currentGameState, setCurrentGameState] = useState<State>("WAITING")
  const [wScale, setWScale] = useState<number>(1)
  const [playersPositions, setPlayersPositions] = useState<Record<number, [number, number, number]>>({})
  const [activePlayers, setActivePlayers] = useState<Record<number, Player>>({})

  const dispatch = useAppDispatch()
  const movementProhibition = useAppSelector((state) => state.game.movementProhibition)

  // 게임 종료 시 움직임 금지
  useEffect(() => {
    if (currentGameState === "FINISHED") {
      dispatch(setMovementProhibition(true))
    }
  }, [currentGameState, dispatch])

  // const connected = true

  // const allPlayers = [
  //   { id: 2, characterName: "nico", position: { direction: 1, x: -1, y: -1 }, nickname: "Player1" },
  //   { id: 4, characterName: "kuro", position: { direction: 1, x: 1, y: -1 }, nickname: "Player2" },
  // ]

  // useEffect(()=>{
  //   console.log("게임 상태: ", currentGameState);
  // }, [currentGameState])

  const rowData: GameResult[] = [
    { rank: 1, nickname: "타락파워전사", score: 120, totalScore: 450, rankChange: 2 },
    { rank: 2, nickname: "게임왕", score: 100, totalScore: 380, rankChange: -1 },
    { rank: 3, nickname: "실버맨", score: 90, totalScore: 320, rankChange: 0 },
    // 더 많은 데이터...
  ]

  // waitingInfo
  // const waitingInfo: NewWaitingInfo = {
  //   state: "WAITING",
  //   timeLeft: 10,
  // }

  // // 임시 userId
  const userId = 3

  // WebSocket 연결
  const { connected, allPlayers, gameState, waitingInfo, currentQuiz, quizResult, sendMove, setMapBoundaries } = useWebSocket(userId)
  // connected, gameInfo, allPlayers, currentQuiz, quizResult,

  // currentGameState 처리
  useEffect(() => {
    if (!gameState) return
    setCurrentGameState(gameState.state)
  }, [gameState])

  useEffect(() => {
    if (allPlayers) {
      setActivePlayers(allPlayers)
    }
  }, [allPlayers])

  const handlePlayerRemove = (playerId: number) => {
    setActivePlayers((prev) => {
      const newPlayers = { ...prev }
      delete newPlayers[playerId]
      return newPlayers
    })
  }

  // 조이스틱 데이터 처리
  const handleJoystickMove = (event: IJoystickUpdateEvent) => {
    // 움직이면 안 되는 상태
    if (movementProhibition) return

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

  // 다른 유저들 움직임 처리
  useEffect(() => {
    if (!allPlayers) return

    const newPositions: Record<number, [number, number, number]> = {}

    Object.values(allPlayers)
      .filter((player) => player.id !== userId)
      .forEach((player) => {
        newPositions[player.id] = [player.position.x, player.position.y, 0]
      })

    setPlayersPositions(newPositions)
  }, [allPlayers, userId])

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

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center w-full h-full relative">
        {connected && waitingInfo && currentGameState === "WAITING" ? (
          <div className="absolute w-[80%] top-15 z-[1000] flex justify-center select-none">
            <WaitingPage waitingInfo={waitingInfo} />
          </div>
        ) : null}
        {connected && currentGameState === "PLAYING" ? (
          <div className="absolute w-[80%] top-10 z-[1000] flex flex-col justify-center items-center opacity-90 select-none">
            <QuestionComponent questionNo={currentQuiz?.quizNumber} question={currentQuiz?.question} timeLeft={currentQuiz?.timeLeft} quizResult={quizResult} gameState={gameState} />
          </div>
        ) : null}
        {connected && currentGameState === "FINISHED" ? (
          <div className="absolute w-[80%] h-[60%] top-10 z-[1000] flex flex-col justify-center items-center opacity-90 select-none">
            <GameResultComponent results={rowData} />
          </div>
        ) : null}

        <Canvas className="w-full z-10 relative">
          <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={70} />
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
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
            {/* 로컬 플레이어 */}
            {(!quizResult || !quizResult.wrongPlayers || !quizResult.wrongPlayers.includes(userId)) && (
              <CharacterSprite
                characterName="kuro"
                joystickData={joystickData}
                tileMapSize={tileMapSize}
                initialPosition={[0, 0, 1]}
                userId={userId}
                nickname={"타락파워전사"}
                sendMove={sendMove}
                setMapBoundaries={setMapBoundaries}
                quizResult={quizResult || undefined}
                allPlayers={activePlayers}
                onPlayerRemove={handlePlayerRemove}
              />
            )}
            {/* 다른 플레이어 */}
            {connected &&
              allPlayers &&
              Object.values(allPlayers)
                .filter((player) => player.id !== userId) // 현재 사용자 제외
                .map((player) => (
                  <>
                    <CharacterSprite
                      key={player.id}
                      characterName={player.characterName}
                      tileMapSize={tileMapSize}
                      initialPosition={playersPositions[player.id] || [player.position.x, player.position.y, 0]}
                      userId={player.id}
                      nickname={player.nickname}
                      quizResult={quizResult || undefined}
                      allPlayers={activePlayers}
                      onPlayerRemove={handlePlayerRemove}
                    />
                  </>
                ))}
          </Suspense>
        </Canvas>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
          <JoystickController onMove={handleJoystickMove} onStop={handleJoystickStop} />
        </div>
      </div>
    </div>
  )
}
