import { configureStore } from "@reduxjs/toolkit";
import { mypageReducer } from "@features/mypage";
import { detailReducer } from "@/features/detail";

export const store = configureStore({
  reducer: {
    mypage: mypageReducer,
    detail: detailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
