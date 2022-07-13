import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback, useLayoutEffect, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FAButton from "../components/FAButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigator/RootNavigator";
import { useAppSelector } from "../store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ExpanseRow from "../components/ExpanseRow";
import ListHeaderCard from "../components/ListHeaderCard";
import { sortAndFilterExpansesList } from "../utils";

type CategoryScreenParams = NativeStackScreenProps<RootParamList, "Inbox">;

const InboxScreen = ({ navigation }: CategoryScreenParams) => {
  const safeAreaInsets = useSafeAreaInsets();
  const { expanses, sortBy, orderBy, filterBy } = useAppSelector(
    (state) => state.expanse
  );
  const categories = useAppSelector((state) => state.category.categories);

  const filteredExpanses = useMemo(
    () =>
      sortAndFilterExpansesList({
        expanses: expanses.filter((item) => !item.category),
        filterBy,
        sortBy,
        orderBy,
        categories,
      }),
    [expanses, filterBy, sortBy, orderBy, categories]
  );

  const onAddExpansePress = useCallback(() => {
    navigation.push("AddExpanse", {
      screen: "Index",
    });
  }, [navigation]);

  const listHeaderComponent = useMemo(() => {
    let totalExpanses = 0;
    filteredExpanses.forEach((expanse) => {
      totalExpanses = totalExpanses + expanse.amount;
    });
    return (
      <ListHeaderCard
        title="Total Expanses"
        value={`৳${totalExpanses.toLocaleString()}`}
      />
    );
  }, [filteredExpanses]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.push("FilterExpanses", {
              screen: "Index",
            })
          }
        >
          <MaterialIcons name="filter-list" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <FlatList
        data={filteredExpanses}
        contentContainerStyle={{
          paddingBottom: safeAreaInsets.bottom + 64 + 32,
        }}
        ListHeaderComponent={listHeaderComponent}
        renderItem={({ item }) => <ExpanseRow hideCategory expanse={item} />}
      />
      <FAButton onPress={onAddExpansePress} />
    </View>
  );
};

export default InboxScreen;
