import { Direction } from "@/shared/types/common"

export interface SpriteAnimationProps {
  texturePath: string
  frameWidth: number
  totalWidth: number
  frameCount: number
  frameTime: number
  direction: Direction
}

export interface CharacterSpriteProps {
  characterName: string
  position?: [number, number, number]
  isMoving: boolean
  direction: Direction
}
