import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expanse } from "../../../types/expanse";
import { addExpanseAsync, restoreExpansesAsync } from "./expanseActions";

export type SortBy = "createdAt" | "updatedAt" | "title" | "category";
export type FilterBy = "year" | "month" | "week" | "today" | "lifetime";
export type OrderBy = "asc" | "desc";

type ExpanseState = {
  expanses: Expanse[];
  sortBy: SortBy;
  filterBy: FilterBy;
  orderBy: OrderBy;
};

export const initialState: ExpanseState = {
  expanses: [],
  sortBy: "createdAt",
  filterBy: "lifetime",
  orderBy: "desc",
};

export const expanseSlice = createSlice({
  name: "expanse",
  initialState,
  reducers: {
    setFilterBy: (state, action: PayloadAction<FilterBy>) => {
      state.filterBy = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<OrderBy>) => {
      state.orderBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addExpanseAsync.fulfilled, (state, action) => {
      state.expanses = [...state.expanses, action.payload];
    });
    builder.addCase(restoreExpansesAsync.fulfilled, (state, action) => {
      state.expanses = action.payload;
    });
  },
});

export const expanseReducer = expanseSlice.reducer;
export const expanseActions = expanseSlice.actions;
