import React from "react";
import { Text, View } from "react-native";
// token
import AsyncStorage from "@react-native-community/async-storage";

const Settings = ({ setToken }) => {
  const deconnexion = async () => {
    const token = await AsyncStorage.removeItem("token");
    setToken(token);
  };

  return (
    <View>
      <View>
        <Text onPress={deconnexion}>Deconnexion</Text>
      </View>
    </View>
  );
};

export default Settings;
