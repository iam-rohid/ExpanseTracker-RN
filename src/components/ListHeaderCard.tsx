import { View, Text } from "react-native";
import React from "react";

const ListHeaderCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#ffffff",
        marginBottom: 1,
      }}
    >
      <Text style={{ fontSize: 16, textAlign: "center" }} numberOfLines={1}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 28,
          textAlign: "center",
          marginTop: 8,
          fontWeight: "600",
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default ListHeaderCard;
