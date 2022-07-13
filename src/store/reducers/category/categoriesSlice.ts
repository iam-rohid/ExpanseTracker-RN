import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../../types/category";
import { addCategoryAsync, restoreCategoriesAsync } from "./categoriesActions";

type CategoryState = {
  categories: Category[];
};

export const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCategoryAsync.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload];
    });
    builder.addCase(restoreCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;
