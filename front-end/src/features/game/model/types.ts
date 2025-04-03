import { Direction } from '@/shared/types/common';

export interface CharacterMovementState {
  position: Position;
  isMoving: boolean;
  direction: Direction;
}

export interface CharacterMovementResult {
  movementState: CharacterMovementState;
  handleJoystickMove: (event: any) => void;
  handleJoystickStop: () => void;
}

export type GameState = "WAITING" | "PLAYING" | "FINISHED"

export interface Position {
  direction: number;
  x: number;
  y: number;
};

export interface Player {
  id: number;
  nickname: string;
  characterName: string;
  position: Position;
}

export interface MoveInfo {
  id: number;
  characterName: string;
  position: Position;
}

export interface GameInfo {
  state: GameState;
  timeLeft: number;
  players: Player[];
}

export interface QuizInfo {
  quizNumber: number;
  question: string;
  timeLeft: number;
}

export interface QuizResult {
  quizNumber: number;
  question: string;
  answer: boolean;
  explanation: string;
  result: boolean;
  score: number;
}

export interface WebSocketCallbacks {
  onGameInfo?: (gameInfo: GameInfo) => void;
  onMove?: (moveInfo: Player) => void;
  onQuizInfo?: (quizInfo: QuizInfo) => void;
  onQuizResult?: (quizResult: QuizResult) => void;
}


