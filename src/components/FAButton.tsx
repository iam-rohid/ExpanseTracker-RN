import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type FAButtonProps = TouchableOpacityProps & {
  icon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};
const FAButton = ({ icon, style, containerStyle, ...rest }: FAButtonProps) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          position: "absolute",
          bottom: 16 + safeAreaInsets.bottom,
          right: 16,
          zIndex: 10,
        },
        containerStyle,
      ]}
    >
      <TouchableOpacity
        style={[
          {
            width: 64,
            height: 64,
            borderRadius: 100,
            backgroundColor: "#3e7bff",
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
        {...rest}
      >
        {icon || <MaterialIcons name="add" size={32} color={"#ffffff"} />}
      </TouchableOpacity>
    </View>
  );
};

export default FAButton;
