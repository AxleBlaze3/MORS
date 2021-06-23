import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const Button = (props) => {
  const text = props.title;
  const functionality = props.onPress;
  return (
    <TouchableOpacity onPress={functionality}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#023C59",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginLeft: 80,
    marginRight: 80,
    marginTop: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default Button;
