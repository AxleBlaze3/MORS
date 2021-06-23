import React from "react";
import {
  Text,
  StatusBar,
  View,
  ToastAndroid,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Toggle from "../components/Toggle";
import TouchableView from "../components/TouchableView";
import { LinearGradient } from "expo-linear-gradient";

const Settings = ({ navigation }) => {
  const showToast = () => {
    ToastAndroid.show("Banner notifications have been turned on!", ToastAndroid.SHORT);
  };
  const showRegions = () => {
    navigation.navigate("Regions");
  };
  const showReport = () => {
    navigation.navigate("Report");
  };
  const homeScreen = () => {
    navigation.navigate("Home");
  };
  const showFeatureReq = () => {
    navigation.navigate("FeatureRequest");
  };

  return (
    <LinearGradient colors={["#023c59", "#012a3e", "#081422"]}>
      <View style={{ backgroundColor: "transparent", height: "100%" }}>
        <View>
          <Text
            style={{
              paddingTop: 50,
              fontSize: 30,
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Settings
          </Text>

          <TouchableOpacity onPress={homeScreen}>
            <Image
              source={require("../../assets/Return2.png")}
              style={{ top: -28, left: 20 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderBottomColor: "white",
            borderBottomWidth: 1,
            paddingTop: 2,
            opacity: 0.7,
          }}
        />

        <Toggle title="Show Banner Notifications" onPress={showToast}></Toggle>
        <View style={{ height: 50, backgroundColor: "transparent" }} />
        {/* <TouchableView title="Regions" onPress={showRegions}></TouchableView>
        <View style={{ height: 30, backgroundColor: "transparent" }} /> */}
        <TouchableView title="Feature Request" onPress={showFeatureReq}></TouchableView>
        <View style={{ height: 30, backgroundColor: "transparent" }} />
        <TouchableView title="Report" onPress={showReport}></TouchableView>
        <View style={{ height: 0.5, backgroundColor: "transparent" }} />
      </View>
    </LinearGradient>
  );
};

export default Settings;
