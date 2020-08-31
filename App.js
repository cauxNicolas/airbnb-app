import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// icons
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// containers
import Login from "./containers/Login";
import Register from "./containers/Register";
import Home from "./containers/Home";
import Room from "./containers/Room";
import Profile from "./containers/Profile";
import AroundMe from "./containers/AroundMe";
// token
import AsyncStorage from "@react-native-community/async-storage";

function App() {
  const [isLoading, setisloading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("token", token);
    } else {
      AsyncStorage.removeItem("token");
    }
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
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: "#de5961",
              inactiveTintColor: "gray",
              showLabel: false,
            }}
          >
            {/* PAGE HOME */}
            <Tab.Screen
              name="Home"
              options={{
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="home" size={size} color={color} />
                ),
              }}
            >
              {() => (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    options={{
                      headerTintColor: "#de5961",
                    }}
                  >
                    {(props) => <Home {...props} />}
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
            </Tab.Screen>
            {/* PAGE AROUNDME */}
            <Tab.Screen
              name="AroundMe"
              options={{
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome5
                    name="map-marked-alt"
                    size={size}
                    color={color}
                  />
                ),
              }}
            >
              {() => (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Around Me"
                    options={{ headerTintColor: "#de5961" }}
                  >
                    {(props) => <AroundMe {...props} />}
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
            </Tab.Screen>
            {/* PAGE PROFILE*/}
            <Tab.Screen
              name="Profile"
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="face"
                    size={size}
                    color={color}
                  />
                ),
              }}
            >
              {() => (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Profile"
                    options={{ headerTintColor: "#de5961" }}
                  >
                    {(props) => <Profile {...props} setToken={setToken} />}
                  </Stack.Screen>
                </Stack.Navigator>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}
export default App;

const styles = StyleSheet.create({
  statusbar: { color: "#aaaaaa" },
});
