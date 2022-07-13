import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { Expanse } from "../types/expanse";
import moment from "moment";
import { useAppSelector } from "../store";

const ExpanseRow = ({
  expanse,
  hideCategory,
}: {
  expanse: Expanse;
  hideCategory?: boolean;
}) => {
  const categories = useAppSelector((state) => state.category.categories);

  const categoryBadge = useCallback(
    (expanse: Expanse) => {
      if (hideCategory) return null;

      const category = categories.find((item) => item.id === expanse.category);
      if (!category) return null;

      return (
        <View
          style={{
            paddingHorizontal: 4,
            paddingVertical: 2,
            borderRadius: 4,
            backgroundColor: "#f1f1f1",
          }}
        >
          <Text>{category.name}</Text>
        </View>
      );
    },
    [categories, hideCategory]
  );

  return (
    <View
      key={expanse.id}
      style={{
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 48,
        marginBottom: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "600", flex: 1 }}
          numberOfLines={1}
        >
          {expanse.title}
        </Text>
        <Text style={{ fontSize: 16 }}>৳{expanse.amount.toLocaleString()}</Text>
      </View>
      {!!expanse.desc && (
        <Text style={{ fontSize: 14, marginTop: 2 }} numberOfLines={1}>
          {expanse.desc}
        </Text>
      )}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
      >
        <Text
          style={{ fontSize: 14, opacity: 0.8, marginRight: 8 }}
          numberOfLines={1}
        >
          {moment(expanse.createdAt).format("MMM d, yyyy")}
        </Text>
        {categoryBadge(expanse)}
      </View>
    </View>
  );
};

export default ExpanseRow;
