import { Direction } from "@/shared/types/common"

export interface CharacterMovementState {
  position: Position
  isMoving: boolean
  direction: Direction
}

export interface CharacterMovementResult {
  movementState: CharacterMovementState
  handleJoystickMove: (event: any) => void
  handleJoystickStop: () => void
}

export type State = "WAITING" | "PLAYING" | "FINISHED"

export interface GameState {
  state: State
  timeLeft?: number
}

export interface Position {
  direction: number
  x: number
  y: number
}

export interface Player {
  id: number
  nickname: string
  characterName: string
  position: Position
}

export interface MoveInfo {
  id: number
  characterName: string
  position: Position
}

export interface NewWaitingInfo {
  state: GameState
  timeLeft: number
}

export interface WaitingInfo extends NewWaitingInfo {
  players: Player[]
}

export interface QuizInfo {
  quizNumber: number
  question: string
  timeLeft: number
}

export interface QuizResult {
  quizNumber: number
  question: string
  answer: boolean
  explanation: string
  correctPlayers: number[]
  wrongPlayers: number[]
}

export interface WebSocketCallbacks {
  onWaitingInfo?: (waitingInfo: WaitingInfo) => void
  onMove?: (moveInfo: Player) => void
  onQuizInfo?: (quizInfo: QuizInfo) => void
  onQuizResult?: (quizResult: QuizResult) => void
  onGameState?: (gameState: GameState) => void
}

export interface GameMoveState {
  movementProhibition: boolean
}
