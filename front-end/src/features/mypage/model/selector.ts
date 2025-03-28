import { RootState } from "@app/redux/store";

// 기본 선택자
export const selectMypageState = (state: RootState) => state.mypage;

// 파생 선택자
export const selectSummaryModalState = (state: RootState) => selectMypageState(state).summaryModal.isOpen;
export const selectWrongAnswerModalState = (state: RootState) => selectMypageState(state).wrongAnswerModal.isOpen;
export const selectScrapModalState = (state: RootState) => selectMypageState(state).scrapModal.isOpen;
export const selectMyInfoModalState = (state: RootState) => selectMypageState(state).myInfoModal.isOpen;
