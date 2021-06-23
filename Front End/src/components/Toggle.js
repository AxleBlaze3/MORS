import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

const Toggle = (props) => {
  const title = props.title;
  const onClick = props.onPress;

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (!isEnabled) onClick();
  };
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 70,
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "white",
          paddingRight: 90,
        }}
      >
        {title}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81c5ff" }}
        thumbColor={isEnabled ? "#111e4d" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default Toggle;
