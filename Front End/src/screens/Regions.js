import React, { useState } from "react";
import { render } from "react-dom";
import { Text, StatusBar, View, ToastAndroid, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Regions = () => {
  return (
    <ScrollView style={{ backgroundColor: "#081422" }}>
      <LinearGradient colors={["#023c59", "#012a3e", "#081422"]}>
        <Text
          style={{
            paddingTop: 400,
            fontSize: 30,
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Welcome to the world of regions.
        </Text>
      </LinearGradient>
    </ScrollView>
  );
};

export default Regions;
