import { configureStore } from "@reduxjs/toolkit";
import { mypageReducer } from "@features/mypage";

export const store = configureStore({
  reducer: {
    mypage: mypageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
