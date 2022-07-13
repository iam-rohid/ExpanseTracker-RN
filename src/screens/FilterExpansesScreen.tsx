import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useMemo } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FilterExpanseParamList } from "../navigator/FilterExpansesNavigator";
import { RootParamList } from "../navigator/RootNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../store";
import { expanseActions } from "../store/reducers/expanse/expanseSlice";

type FilterExpansesScreen = CompositeScreenProps<
  NativeStackScreenProps<FilterExpanseParamList, "Index">,
  NativeStackScreenProps<RootParamList>
>;

const FilterExpansesScreen = ({ navigation }: FilterExpansesScreen) => {
  const safeAreaInsets = useSafeAreaInsets();
  const { filterBy, orderBy, sortBy } = useAppSelector(
    (state) => state.expanse
  );
  const dispatch = useAppDispatch();
  const filterByOptions = useMemo(
    () => [
      {
        label: "Lifetime",
        isSelected: filterBy === "lifetime",
        onPress: () => {
          dispatch(expanseActions.setFilterBy("lifetime"));
        },
      },
      {
        label: "Today",
        isSelected: filterBy === "today",
        onPress: () => {
          dispatch(expanseActions.setFilterBy("today"));
        },
      },
      {
        label: "This Week",
        isSelected: filterBy === "week",
        onPress: () => {
          dispatch(expanseActions.setFilterBy("week"));
        },
      },
      {
        label: "This Month",
        isSelected: filterBy === "month",
        onPress: () => {
          dispatch(expanseActions.setFilterBy("month"));
        },
      },
      {
        label: "This Year",
        isSelected: filterBy === "year",
        onPress: () => {
          dispatch(expanseActions.setFilterBy("year"));
        },
      },
    ],
    [filterBy, dispatch]
  );

  const sortByOptions = useMemo(
    () => [
      {
        label: "Created At",
        isSelected: sortBy === "createdAt",
        onPress: () => {
          dispatch(expanseActions.setSortBy("createdAt"));
        },
      },
      {
        label: "Updated At",
        isSelected: sortBy === "updatedAt",
        onPress: () => {
          dispatch(expanseActions.setSortBy("updatedAt"));
        },
      },
      {
        label: "Title",
        isSelected: sortBy === "title",
        onPress: () => {
          dispatch(expanseActions.setSortBy("title"));
        },
      },
      {
        label: "Category",
        isSelected: sortBy === "category",
        onPress: () => {
          dispatch(expanseActions.setSortBy("category"));
        },
      },
    ],
    [sortBy, dispatch]
  );

  const orderByOptions = useMemo(
    () => [
      {
        label: "Ascending",
        isSelected: orderBy === "asc",
        onPress: () => {
          dispatch(expanseActions.setOrderBy("asc"));
        },
      },
      {
        label: "Descending",
        isSelected: orderBy === "desc",
        onPress: () => {
          dispatch(expanseActions.setOrderBy("desc"));
        },
      },
    ],
    [dispatch, orderBy]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 16, color: "blue" }}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ paddingBottom: safeAreaInsets.bottom + 32 }}>
        <View style={{ marginVertical: 16 }}>
          <Text style={{ paddingHorizontal: 16, marginBottom: 8 }}>
            Filter By
          </Text>
          {filterByOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                minHeight: 48,
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#ffffff",
                marginBottom: 1,
              }}
              onPress={item.onPress}
            >
              <Text style={{ fontSize: 16, flex: 1 }}>{item.label}</Text>
              {item.isSelected && <MaterialIcons name="check" size={24} />}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginVertical: 16 }}>
          <Text style={{ paddingHorizontal: 16, marginBottom: 8 }}>
            Sort By
          </Text>
          {sortByOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                minHeight: 48,
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#ffffff",
                marginBottom: 1,
              }}
              onPress={item.onPress}
            >
              <Text style={{ fontSize: 16, flex: 1 }}>{item.label}</Text>
              {item.isSelected && <MaterialIcons name="check" size={24} />}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginVertical: 16 }}>
          <Text style={{ paddingHorizontal: 16, marginBottom: 8 }}>
            Order By
          </Text>
          {orderByOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                minHeight: 48,
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#ffffff",
                marginBottom: 1,
              }}
              onPress={item.onPress}
            >
              <Text style={{ fontSize: 16, flex: 1 }}>{item.label}</Text>
              {item.isSelected && <MaterialIcons name="check" size={24} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default FilterExpansesScreen;
