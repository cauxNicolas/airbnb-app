import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    try {
      const fetchData = async () => {
        const response = await Axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            name: name,
            description: description,
            password: password,
          }
        );
        console.log(response);
      };
      fetchData();
    } catch (error) {}
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={110}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView style={styles.background}>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.connexion}>Inscription</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => {
                  setusername(text);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />

              <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="confirm pasword"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
              />
              <TextInput
                style={styles.inputDescription}
                placeholder="description"
                value={description}
                multiline={true}
                onChangeText={(text) => {
                  setDescription(text);
                }}
              />
            </View>
            <TouchableHighlight
              style={styles.button}
              onPress={handleSubmit}
              underlayColor="#AF4852"
            >
              <Text style={styles.textButton}>Inscription</Text>
            </TouchableHighlight>
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
