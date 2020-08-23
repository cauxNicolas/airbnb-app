import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet, Text } from "react-native";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();

// containers
import Login from "./containers/Login";
import Register from "./containers/Register";
import Home from "./containers/Home";
import Room from "./containers/Room";
// token
import AsyncStorage from "@react-native-community/async-storage";

function App() {
  const [isLoading, setisloading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      console.log("1");
      AsyncStorage.setItem("token", token);
    } else {
      console.log("2");
      AsyncStorage.removeItem("token");
    }
    console.log("3");
    setUserToken(token);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await AsyncStorage.getItem("token");
      setisloading(false);
      setUserToken(userToken);
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
              {(props) => <Login {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <Register {...props} />}
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
              {(props) => <Home {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="Room"
              options={{
                headerTintColor: "#de5961",
              }}
            >
              {(props) => <Room {...props} />}
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
