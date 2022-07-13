import React from "react";
import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddExpanseNavigator, {
  AddExpanseParamList,
} from "./AddExpanseNavigator";
import DrawerScreen from "../screens/DrawerScreen";
import InboxScreen from "../screens/InboxScreen";
import CategoryScreen from "../screens/CategoryScreen";
import AllExpansesScreen from "../screens/AllExpansesScreen";
import FilterExpansesNavigator, {
  FilterExpanseParamList,
} from "./FilterExpansesNavigator";

export type RootParamList = {
  Lists: undefined;
  Inbox: undefined;
  AllExpanses: undefined;
  Category: {
    id: string;
  };
  AddExpanse: NavigatorScreenParams<AddExpanseParamList>;
  FilterExpanses: NavigatorScreenParams<FilterExpanseParamList>;
};

const RootStack = createNativeStackNavigator<RootParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Lists">
        <RootStack.Screen
          name="Lists"
          component={DrawerScreen}
          options={{ title: "Menu" }}
        />
        <RootStack.Screen name="Inbox" component={InboxScreen} />
        <RootStack.Screen
          name="AllExpanses"
          component={AllExpansesScreen}
          options={{ headerTitle: "All Expanses" }}
        />
        <RootStack.Screen name="Category" component={CategoryScreen} />
        <RootStack.Group
          screenOptions={{ presentation: "modal", headerShown: false }}
        >
          <RootStack.Screen name="AddExpanse" component={AddExpanseNavigator} />
          <RootStack.Screen
            name="FilterExpanses"
            component={FilterExpansesNavigator}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
