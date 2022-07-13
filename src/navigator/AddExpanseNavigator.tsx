import React from "react";
import SelectCategoryScreen from "../screens/SelectCategoryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddExpanseScreen from "../screens/AddExpanseScreen";
import AddExpanseProvider from "../contexts/AddExpanseContext";

export type AddExpanseParamList = {
  Index?: {
    id: string;
  };
  SelectCategory: {
    id?: string;
  };
};

const AddExpanseStack = createNativeStackNavigator<AddExpanseParamList>();

const AddExpanseNavigator = () => {
  return (
    <AddExpanseProvider>
      <AddExpanseStack.Navigator initialRouteName="Index">
        <AddExpanseStack.Screen
          name="Index"
          component={AddExpanseScreen}
          options={{ title: "Add Expanse" }}
        />
        <AddExpanseStack.Screen
          name="SelectCategory"
          component={SelectCategoryScreen}
          options={{ title: "Select Category" }}
        />
      </AddExpanseStack.Navigator>
    </AddExpanseProvider>
  );
};

export default AddExpanseNavigator;
