import React, { useState } from "react";
import { render } from "react-dom";
import {
  Text,
  StatusBar,
  View,
  ToastAndroid,
  ScrollView,
  Touchable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import TextField from "../components/TextField"

const Report = ({navigation}) => {

  const settings = () => {
    navigation.navigate("Settings");
  };

  const showToast = () => {
    ToastAndroid.show("Meghana got reported successfully", ToastAndroid.SHORT);
  };
  return (
    <ScrollView style={{ backgroundColor: "#081422" }}>
      <LinearGradient colors={["#023c59", "#012a3e", "#081422"]}>
        <Text
          style={{
            paddingTop: 50,
            fontSize: 30,
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Report Page
        </Text>

        <View
          style={{
            borderBottomColor: "white",
            borderBottomWidth: 1,
            paddingTop: 20,
            opacity: 0.7,
          }}
        />

        <TextField title="Type Here!"/>
        <Button title="Submit" onPress={settings} />
      </LinearGradient>
    </ScrollView>
  );
};

export default Report;
