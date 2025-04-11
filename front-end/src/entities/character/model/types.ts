import { Player, Position, QuizResult } from "@/features/game/model/types"
import { Boundaries } from "@/shared/types/common"
import { JoystickData } from "@/shared/types/joystick"

export interface SpriteAnimationProps {
  texturePath: string
  frameWidth: number
  totalWidth: number
  frameCount: number
  frameTime: number
  direction: number
  loop?: boolean
  onAnimationComplete?: () => void
}

export interface CharacterSpriteProps {
  characterName: string
  joystickData?: JoystickData
  tileMapSize: { width: number; height: number }
  initialPosition: [number, number, number]
  userId?: number
  sendMove?: (userId: number, characterName: string, position: Position) => void
  nickname: string
  setMapBoundaries?: (newBoundaries: Boundaries) => void
  quizResult?: QuizResult
  allPlayers?: Record<number, Player>
  onPlayerRemove?: (userId: number) => void
  isLocal: boolean
}

export interface GameResult {
  rank: number
  nickname: string
  score: number
  totalScore: number
  rankChange: number
}
