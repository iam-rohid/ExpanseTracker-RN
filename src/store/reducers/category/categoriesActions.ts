import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { Category } from "../../../types/category";
import { getUuid } from "../../../utils/get-uuid";

const CATEGORIES_KEY = "categories";
export const addCategoryAsync = createAsyncThunk(
  "category/addCategoryAsync",
  async (name: string, { getState }) => {
    const state = getState() as RootState;
    const category: Category = {
      id: getUuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name,
    };
    const categories = [...state.category.categories, category];
    AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    return category;
  }
);

export const restoreCategoriesAsync = createAsyncThunk(
  "category/restoryCategoriesAsync",
  async () => {
    const categories = await AsyncStorage.getItem(CATEGORIES_KEY);
    if (categories) return JSON.parse(categories) as Category[];
    else return [];
  }
);
