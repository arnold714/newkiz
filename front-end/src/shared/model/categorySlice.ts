import { CategoryState } from "@/shared/types/reduxType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CategoryState = {
    categoryModal: {
        isOpen: false,
    },
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        openCategoryModal: (state)=>{
            state.categoryModal.isOpen = true;
        },
        closeCategoryModal: (state)=>{
            state.categoryModal.isOpen = false;
        }
    }
})

export const { openCategoryModal, closeCategoryModal } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
