import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = ({
  keyboardType,
  secureTextEntry,
  setFunction,
  placeholder,
  placeholderTextColor,
}) => {
  return (
    <TextInput
      style={styles.input}
      keyboardType={keyboardType ? keyboardType : "default"}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      autoCapitalize="none"
      textContentType="none"
      secureTextEntry={secureTextEntry ? true : false}
      onChangeText={(text) => {
        setFunction(text);
      }}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "#de5961",
    borderBottomWidth: 1,
    marginHorizontal: 50,
    marginVertical: 10,
    padding: 10,
  },
  errorInput: {
    backgroundColor: "#ffdddf",
    marginHorizontal: 50,
    marginVertical: 15,
    padding: 20,
  },
});
