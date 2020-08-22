import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

const Button = ({ handleSubmit, titleButton }) => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={handleSubmit}
      underlayColor="#AF4852"
    >
      <Text style={styles.textButton}>{titleButton}</Text>
    </TouchableHighlight>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#de5961",
    marginHorizontal: 50,
    marginVertical: 50,
    padding: 13,
  },
  textButton: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
  },
});
