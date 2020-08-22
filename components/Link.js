import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Link = ({ screen, titleLink }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity>
      <Text
        style={styles.registerText}
        onPress={() => {
          navigation.navigate(screen);
        }}
      >
        {titleLink}
      </Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  registerText: { textAlign: "center", color: "#de5961" },
});
