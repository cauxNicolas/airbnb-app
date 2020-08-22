import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// conexion
import axios from "axios";
// token
import AsyncStorage from "@react-native-community/async-storage";
// navigation
import { useNavigation } from "@react-navigation/native";
//components
import Button from "../components/Button";
import Input from "../components/Input";

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // error
  const [errorInput, setErrorInput] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const handleSubmit = async () => {
    if (
      email &&
      username &&
      name &&
      description &&
      password &&
      confirmPassword
    ) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              name: name,
              description: description,
              password: password,
            }
          );
          // on envoie le token en memoire on change de screen > Home
          if (response.data.token) {
            await AsyncStorage.setItem("token", response.data.token);
            navigation.push("Home");
          }
          console.log(response);
        } catch (error) {}
      } else {
        setErrorPassword(true);
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
            <Text style={styles.connexion}>Rejoignez-nous !</Text>
            <View>
              <Input
                placeholder="email"
                keyboardType="email-address"
                placeholderTextColor={errorInput === false ? "#bbbbbd" : "red"}
                setFunction={setEmail}
              />
              <Input
                placeholder="username"
                placeholderTextColor={errorInput === false ? "#bbbbbd" : "red"}
                setFunction={setusername}
              />
              <Input
                placeholder="name"
                placeholderTextColor={errorInput === false ? "#bbbbbd" : "red"}
                setFunction={setName}
              />
              <Input
                placeholder="password"
                secureTextEntry={true}
                placeholderTextColor={errorInput === false ? "#bbbbbd" : "red"}
                setFunction={setPassword}
              />
              <Input
                placeholder="condirm pasword"
                secureTextEntry={true}
                placeholderTextColor={errorInput === false ? "#bbbbbd" : "red"}
                setFunction={setConfirmPassword}
              />
              {errorPassword === false ? (
                <></>
              ) : (
                <Text style={styles.error}>
                  les mots de passe ne sont pas identiques
                </Text>
              )}
              <TextInput
                style={styles.inputDescription}
                placeholder="description"
                placeholderTextColor={errorInput === false ? "#bbbbbd" : "red"}
                value={description}
                multiline={true}
                onChangeText={(text) => {
                  setDescription(text);
                }}
              />
            </View>
            {errorInput === false ? (
              <></>
            ) : (
              <Text style={styles.error}>Merci de remplir les champs</Text>
            )}
            <Button
              titleButton="Inscription"
              handleSubmit={handleSubmit}
            ></Button>
            <TouchableOpacity>
              <Text
                style={styles.registerText}
                onPress={() => {
                  navigation.goBack("Home");
                }}
              >
                Déja un compte ? se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Register;

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
  goBack: { marginLeft: 20, marginTop: 20 },
  connexion: {
    textAlign: "center",
    color: "#de5961",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 60,
  },
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
  error: { color: "red", marginHorizontal: 50, marginBottom: 20 },

  inputDescription: {
    backgroundColor: "#e4e4e4",
    marginHorizontal: 50,
    marginVertical: 10,
    padding: 10,
    height: 110,
  },
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
  registerText: { textAlign: "center", color: "#de5961" },
});
