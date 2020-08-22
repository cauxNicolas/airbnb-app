import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet, Text } from "react-native";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
// containers
import Login from "./containers/Login";
import Register from "./containers/Register";
import Home from "./containers/Home";
// token
import AsyncStorage from "@react-native-community/async-storage";

function App() {
  const [isLoading, setisloading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await AsyncStorage.getItem("token");
      setisloading(false);
      setUserToken(userToken);
      console.log(userToken);
    };
    fetchToken();
  }, []);

  return (
    <>
      <StatusBar barStyle={styles.statusbar} />
      <NavigationContainer>
        {isLoading ? null : userToken === null ? (
          <Stack.Navigator initialRouteName={"Login"}>
            <Stack.Screen
              name="Login"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <Login {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <Register {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="Home"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <Home {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{
                headerTintColor: "#de5961",
              }}
            >
              {(props) => <Home {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  statusbar: { color: "#aaaaaa" },
});
