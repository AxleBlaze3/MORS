import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
//import { patchWebProps } from 'react-native-elements/dist/helpers';

const TextField = (props) => {
  const [text, setText] = useState('');
  const [height, setHeight] = useState(200);

  const styles = StyleSheet.create({
    textBox: {
      backgroundColor: "#023C59",
      borderRadius: 8,
      marginLeft: 50,
      marginRight: 50,
      marginTop: 100,
      flexDirection: "row",
    },

    textBoxInput: {
      height: height,
      textAlignVertical: 'top',
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 25,
    },
  });

  const existingText = props.title;
  return (
    <View style={styles.textBox}>
      <TextInput
        style={styles.textBoxInput}
        placeholder={existingText}
        onChangeText={(text) => {
          setText(text)
          setHeight(text.split('\n').length < 10 ? 200 : text.split('\n').length * 20)
        }}
        defaultValue={text}
        multiline={true}
      />
    </View>

  );
}

export default TextField;