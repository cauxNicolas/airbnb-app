import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
// clavier
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// api
import axios from "axios";
// token
import AsyncStorage from "@react-native-community/async-storage";
// components
import Button from "../components/Button";
import ButtonWhite from "../components/ButtonWhite";
import Input from "../components/Input";

const Profile = ({ setToken }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    };
    fetchData();
  }, []);

  const deconnexion = async () => {
    const token = await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    setToken(token);
  };
  console.log(data);
  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          flex: 1,
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
          <Input placeholder={data.name} placeholderTextColor="grey" />
          <Input placeholder={data.username} placeholderTextColor="grey" />
          <Input placeholder={data.email} placeholderTextColor="grey" />
          <TextInput
            style={styles.inputDescription}
            placeholder={`${data.description}`}
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
  presentation: {
    marginTop: 40,
    width: "100%",
  },
  image: { alignItems: "center" },
  inputDescription: {
    backgroundColor: "#e4e4e4",
    marginHorizontal: 50,
    marginVertical: 10,
    padding: 10,
    height: 110,
  },
});
