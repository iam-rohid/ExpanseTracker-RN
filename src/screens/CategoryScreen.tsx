import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback, useLayoutEffect, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigator/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FAButton from "../components/FAButton";
import { useAppSelector } from "../store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ListHeaderCard from "../components/ListHeaderCard";
import ExpanseRow from "../components/ExpanseRow";
import { sortAndFilterExpansesList } from "../utils";

type CategoryScreenParams = NativeStackScreenProps<RootParamList, "Category">;

const CategoryScreen = ({
  navigation,
  route: {
    params: { id: categoryId },
  },
}: CategoryScreenParams) => {
  const category = useAppSelector((state) =>
    state.category.categories.find((cat) => cat.id === categoryId)
  );
  const { expanses, sortBy, orderBy, filterBy } = useAppSelector(
    (state) => state.expanse
  );
  const categories = useAppSelector((state) => state.category.categories);

  const filteredExpanses = useMemo(
    () =>
      sortAndFilterExpansesList({
        expanses: expanses.filter((item) => item.category === categoryId),
        filterBy,
        sortBy,
        orderBy,
        categories,
      }),
    [expanses, filterBy, sortBy, orderBy, categories]
  );

  const safeAreaInsets = useSafeAreaInsets();

  const onAddExpansePress = useCallback(() => {
    navigation.push("AddExpanse", {
      screen: "Index",
      params: {
        id: categoryId,
      },
    });
  }, [navigation, category]);

  const listHeaderComponent = useMemo(() => {
    let totalExpanses = 0;
    filteredExpanses.forEach((expanse) => {
      totalExpanses = totalExpanses + expanse.amount;
    });
    return (
      <ListHeaderCard
        title={`Total '${category?.name}' Expanses`}
        value={`৳${totalExpanses.toLocaleString()}`}
      />
    );
  }, [filteredExpanses]);

  useLayoutEffect(() => {
    if (!category) return;
    navigation.setOptions({
      headerTitle: category.name,
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
  }, [category, navigation]);

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

export default CategoryScreen;
