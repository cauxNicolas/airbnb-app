import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Axios from "axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    try {
      const fetchData = async () => {
        const response = await Axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email: email, password: password }
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
            <View style={styles.blockLogo}>
              <Image
                source={require("../assets/img/logo.png")}
                style={styles.logo}
                resizeMethod="cover"
              />
            </View>
            <Text style={styles.connexion}>Connexion</Text>
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
                placeholder="password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>
            <TouchableHighlight
              style={styles.button}
              onPress={handleSubmit}
              underlayColor="#AF4852"
            >
              <Text style={styles.textButton}>Se connecter</Text>
            </TouchableHighlight>
            <TouchableOpacity>
              <Text
                style={styles.registerText}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                Pas de compte ? s'inscrire
              </Text>
            </TouchableOpacity>
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
  input: {
    //backgroundColor: "#fbfbfb",
    borderBottomColor: "#de5961",
    borderBottomWidth: 1,
    marginHorizontal: 50,
    marginVertical: 25,
    padding: 20,
  },
  button: {
    backgroundColor: "#de5961",
    marginHorizontal: 50,
    //marginLeft: "auto",
    //marginRight: "auto",
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
