import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

const Toggle = (props) => {
  const title = props.title;
  const onClick = props.onPress;
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        height: 40,
        backgroundColor: "transparent",
      }}
      onPress={onClick}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Toggle;
