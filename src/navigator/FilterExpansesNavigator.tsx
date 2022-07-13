import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterExpansesScreen from "../screens/FilterExpansesScreen";

export type FilterExpanseParamList = {
  Index: undefined;
  SortBy: undefined;
};

const FilterExpanseStack = createNativeStackNavigator<FilterExpanseParamList>();
const FilterExpansesNavigator = () => {
  return (
    <FilterExpanseStack.Navigator>
      <FilterExpanseStack.Screen
        name="Index"
        component={FilterExpansesScreen}
        options={{
          title: "Sort & Filter",
        }}
      />
    </FilterExpanseStack.Navigator>
  );
};

export default FilterExpansesNavigator;
