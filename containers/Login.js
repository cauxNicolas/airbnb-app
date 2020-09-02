import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// components
import Button from "../components/Button";
import Link from "../components/Link";
import Input from "../components/Input";
// connexion
import axios from "axios";
// profileUser - token
import AsyncStorage from "@react-native-community/async-storage";

const Login = ({ setToken }) => {
  // state
  const [email, setEmail] = useState(""); // concept@concept.com
  const [password, setPassword] = useState(""); // azerty
  // error
  const [errorInput, setErrorInput] = useState(false);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email: email, password: password }
        );

        // on envoie le token en memoire on change de screen > Home
        if (response.data.token) {
          setToken(response.data.token);
          await AsyncStorage.setItem("userId", response.data.id);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          console.log("401");
        }
        if (error.response.status === 400) {
          console.log("400");
        }
      }
    } else {
      setErrorInput(true);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={110}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView style={styles.background}>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.blockLogo}>
              <Image
                source={require("../assets/img/logo.png")}
                style={styles.logo}
              />
            </View>
            <Text style={styles.connexion}>Connexion</Text>
            <View>
              <Input
                placeholder="email"
                keyboardType="email-address"
                errorInput={errorInput}
                placeholderTextColor={errorInput === false ? "#bbbbbd" : "red"}
                setFunction={setEmail}
              />
              <Input
                placeholder="password"
                errorInput={errorInput}
                placeholderTextColor={errorInput === false ? "#bbbbbd" : "red"}
                secureTextEntry={true}
                setFunction={setPassword}
              />
            </View>
            {errorInput === false ? (
              <></>
            ) : (
              <Text style={styles.error}>Merci de remplir les champs</Text>
            )}
            <Button
              handleSubmit={handleSubmit}
              titleButton="Se connecter"
            ></Button>
            <Link
              screen="Register"
              titleLink="Pas de compte ? S'inscrire"
            ></Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: "#F35960",
    alignItems: "center",
    justifyContent: "center",
  },
  background: { flex: 1 },
  content: { justifyContent: "space-around" },
  blockLogo: { alignItems: "center", marginTop: 20, padding: 10 },
  logo: {
    height: 65,
    width: 180,
  },
  connexion: {
    textAlign: "center",
    color: "#de5961",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 60,
    marginBottom: 40,
  },
  error: { color: "red", marginHorizontal: 50, marginBottom: 20 },

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
