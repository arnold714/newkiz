import { MypageState } from "@/shared/types/reduxType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MypageState = {
    summaryModal: {
        isOpen: false,
    },
    wrongAnswerModal: {
        isOpen: false,
    },
    scrapModal: {
        isOpen: false,
    },
    myInfoModal: {
        isOpen: false,
    },
}

const mypageSlice = createSlice({
    name: "mypage",
    initialState,
    reducers: {
        summaryModal: (state)=>{
            state.summaryModal.isOpen = !state.summaryModal.isOpen;
        },
        wrongAnswerModal: (state)=>{
            state.wrongAnswerModal.isOpen = !state.wrongAnswerModal.isOpen; 
        },
        scrapModal: (state)=>{
            state.scrapModal.isOpen = !state.scrapModal.isOpen; 
        },
        myInfoModal: (state)=>{
            state.myInfoModal.isOpen = !state.myInfoModal.isOpen    
        }
    }
})

export const { summaryModal, wrongAnswerModal, scrapModal, myInfoModal } = mypageSlice.actions;
export const mypageReducer = mypageSlice.reducer;
