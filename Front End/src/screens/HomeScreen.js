import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Map from "../components/Map";

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#011e2c"
        translucent={true}
        showHideTransition={true}
      />
      <TouchableOpacity onPress={() => props.navigation.navigate("Settings")}>
        <Image source={require("../../assets/Settings_Icon.png")} />
      </TouchableOpacity>
      <Text style={styles.textStyle}>
        {props.location}: {props.aqi} ({props.condition})
      </Text>
    </SafeAreaView>
  );
};

export default data = (props) => {
  return (
    <View style={styles.upperComponents}>
      <HomeScreen
        navigation={props.navigation}
        location="Hyderabad"
        aqi="75"
        condition="Good"
      />
      <Map navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  upperComponents: {
    flex: 1,
    backgroundColor: "#012a3e",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingTop: StatusBar.currentHeight + 5,
    paddingBottom: 5,
    paddingRight: 10,
  },
  textStyle: {
    fontWeight: "bold",
    color: "white",
  },
});
