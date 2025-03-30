import { createSlice } from "@reduxjs/toolkit";
import { DetailState } from "@/shared/types/reduxType";

const initialState: DetailState = {
  quizModal: {
    isOpen: false,
  },
}

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    quizModal: (state) => {
      state.quizModal.isOpen =  !state.quizModal.isOpen;
    }
  }
})

export const { quizModal } = detailSlice.actions;
export const detailReducer = detailSlice.reducer;