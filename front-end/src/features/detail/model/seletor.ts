import { RootState } from "@/app/redux/store";

export const selectDetailState = (state: RootState) => state.detail;

export const selectQuizModalState = (state: RootState) => selectDetailState(state).quizModal.isOpen;