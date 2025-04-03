import { Position } from "@/features/game/model/types"
import { JoystickData } from "@/shared/types/joystick"

export interface SpriteAnimationProps {
  texturePath: string
  frameWidth: number
  totalWidth: number
  frameCount: number
  frameTime: number
  direction: number
}

export interface CharacterSpriteProps {
  characterName: string
  joystickData: JoystickData
  tileMapSize: { width: number; height: number }
  initialPosition: [number, number, number]
  userId?: number;
  sendMove?: (characterName: string, position: Position) => void;
  nickname?: string;
}
