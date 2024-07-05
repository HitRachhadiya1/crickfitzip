import React from "react";
import { View } from "react-native";
import Octicons from 'react-native-vector-icons/Octicons';

const BottomMenuItem = ({ iconName, isCurrent }) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Octicons
        name={iconName}
        size={32}
        style={{ color: isCurrent ? "black" : "white" }}
      />
    </View>
  );
};

export default BottomMenuItem;