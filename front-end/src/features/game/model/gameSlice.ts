import { GameMoveState } from "@features/game/model/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: GameMoveState = {
  movementProhibition: false,
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setMovementProhibition: (state, action: PayloadAction<boolean>) => {
      state.movementProhibition = action.payload
    },
  },
})

export const { setMovementProhibition } = gameSlice.actions
export const gameReducer = gameSlice.reducer
