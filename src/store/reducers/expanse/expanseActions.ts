import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Expanse } from "../../../types/expanse";
import { getUuid } from "../../../utils/get-uuid";

const EXPANSES_KEY = "expanses";
export const addExpanseAsync = createAsyncThunk(
  "expanse/addExpanseAsync",
  async (
    {
      title,
      desc,
      category,
      amount,
    }: {
      title: string;
      amount: number;
      desc?: string;
      category?: string;
    },
    { getState }
  ) => {
    const state = getState() as RootState;
    const expanse: Expanse = {
      id: getUuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title,
      amount,
      desc,
      category,
    };
    const expanses = [...state.expanse.expanses, expanse];
    AsyncStorage.setItem(EXPANSES_KEY, JSON.stringify(expanses));
    return expanse;
  }
);

export const restoreExpansesAsync = createAsyncThunk(
  "expanse/restoreExpansesAsync",
  async () => {
    const categories = await AsyncStorage.getItem(EXPANSES_KEY);
    if (categories) return JSON.parse(categories) as Expanse[];
    else return [];
  }
);
