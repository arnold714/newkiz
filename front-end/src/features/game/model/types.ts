import { Direction } from '@/shared/types/common';

export interface CharacterMovementState {
  position: [number, number, number];
  isMoving: boolean;
  direction: Direction;
}

export interface CharacterMovementResult {
  movementState: CharacterMovementState;
  handleJoystickMove: (event: any) => void;
  handleJoystickStop: () => void;
}
