import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
// clavier
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// token
import AsyncStorage from "@react-native-community/async-storage";
// components
import Button from "../components/Button";
import ButtonWhite from "../components/ButtonWhite";
import Input from "../components/Input";

const Profile = ({ setToken }) => {
  const [profile, setProfile] = useState({});
  const fetchUser = async () => {
    const stored = await AsyncStorage.getItem("profileUser");
    const user = JSON.parse(stored);
    setProfile(user);
  };
  fetchUser();

  const deconnexion = async () => {
    const token = await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("profileUser");
    setToken(token);
  };
  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.presentation}>
          <View style={styles.image}>
            <Image
              source={require("../assets/icon.png")}
              style={{ width: 80, height: 80 }}
            />
          </View>
          <Input placeholder={profile.name} placeholderTextColor="grey" />
          <Input placeholder={profile.username} placeholderTextColor="grey" />
          <Input placeholder={profile.email} placeholderTextColor="grey" />
          <TextInput
            style={styles.inputDescription}
            placeholder={`${profile.description}`}
            placeholderTextColor="grey"
            multiline={true}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          <ButtonWhite titleButton="Mettre a jour" />
          <Button titleButton="Deconnexion" handleSubmit={deconnexion} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  presentation: { marginTop: 40, width: "100%" },
  image: { alignItems: "center" },
  inputDescription: {
    backgroundColor: "#e4e4e4",
    marginHorizontal: 50,
    marginVertical: 10,
    padding: 10,
    height: 110,
  },
});
