import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React, { ReactNode } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAddExpanse } from "../contexts/AddExpanseContext";

const SelectCategoryScreen = () => {
  const { category, setCategory } = useAddExpanse();
  const categories = useAppSelector((state) => state.category.categories);
  return (
    <ScrollView>
      <SafeAreaView edges={["bottom"]}>
        <View style={{ marginVertical: 16 }}>
          <Item
            label={"Default"}
            isSelected={!category}
            icon={<MaterialIcons name="list" size={24} />}
            onPress={() => setCategory(null)}
          />
          {categories.map((item) => (
            <Item
              key={item.id}
              label={item.name}
              isSelected={item.id === category}
              icon={<MaterialIcons name="list" size={24} />}
              onPress={() => setCategory(item.id)}
            />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SelectCategoryScreen;

type ItemProps = {
  label: string;
  isSelected?: boolean;
  icon: ReactNode;
} & TouchableOpacityProps;

const Item = ({ label, isSelected, icon, style, ...rest }: ItemProps) => (
  <TouchableOpacity
    style={[
      {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 1,
      },
      style,
    ]}
    {...rest}
  >
    <View style={{ marginRight: 16 }}>{icon}</View>
    <Text style={{ fontSize: 16, flex: 1 }} numberOfLines={1}>
      {label}
    </Text>
    {isSelected && <MaterialIcons name="check" size={24} />}
  </TouchableOpacity>
);
