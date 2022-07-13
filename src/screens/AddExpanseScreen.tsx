import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useCallback, useEffect } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigator/RootNavigator";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { AddExpanseParamList } from "../navigator/AddExpanseNavigator";
import { useAppSelector } from "../store";
import { useAddExpanse } from "../contexts/AddExpanseContext";

type AddExpanseScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AddExpanseParamList, "Index">,
  NativeStackScreenProps<RootParamList>
>;

const AddExpanseScreen = ({ navigation, route }: AddExpanseScreenProps) => {
  const {
    category: categoryId,
    title,
    setTitle,
    amount,
    setAmount,
    desc,
    setDesc,
    setCategory,
    addExpanse,
  } = useAddExpanse();

  const category = useAppSelector((state) =>
    state.category.categories.find((item) => item.id === categoryId)
  );

  useEffect(() => {
    if (route.params?.id) {
      setCategory(route.params.id);
    } else {
      setCategory(null);
    }
  }, [route.params, setCategory]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            addExpanse((added) => {
              if (added) {
                navigation.goBack();
              }
            });
          }}
        >
          <Text style={{ fontSize: 16, color: "blue" }}>Done</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ fontSize: 16, color: "red" }}>Cancel</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, route, addExpanse]);

  const onSelectCategoryPress = useCallback(() => {
    navigation.navigate("SelectCategory", {
      id: route.params?.id,
    });
  }, [navigation, route]);

  return (
    <ScrollView style={{ flex: 1, paddingVertical: 16 }}>
      <TextInput
        placeholder="Title"
        style={{
          padding: 16,
          fontSize: 16,
          backgroundColor: "#ffffff",
          marginBottom: 1,
        }}
        value={title}
        onChangeText={setTitle}
        autoFocus
      />
      <TextInput
        placeholder="Amount"
        keyboardType="number-pad"
        style={{
          padding: 16,
          fontSize: 16,
          backgroundColor: "#ffffff",
          marginBottom: 1,
        }}
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        placeholder="Description (Optional)"
        style={{
          padding: 16,
          fontSize: 16,
          backgroundColor: "#ffffff",
          marginBottom: 1,
        }}
        value={desc}
        onChangeText={setDesc}
      />
      <TouchableOpacity
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#ffffff",
          marginBottom: 1,
        }}
        onPress={onSelectCategoryPress}
      >
        <MaterialIcons
          name="list"
          size={24}
          style={{ marginRight: 16, opacity: 0.5 }}
        />
        <Text style={{ fontSize: 16, flex: 1 }}>Category</Text>
        <Text style={{ fontSize: 14, opacity: 0.5 }}>
          {category ? category.name : "Default"}
        </Text>
        <MaterialIcons
          name="chevron-right"
          size={24}
          style={{
            opacity: 0.5,
          }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddExpanseScreen;

const Divider = () => (
  <View style={{ height: 1, marginLeft: 16, backgroundColor: "#f1f1f1" }} />
);
