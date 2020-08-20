import * as React from "react";
import { StatusBar, StyleSheet } from "react-native";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// Slide
import Login from "./containers/Login";
import Register from "./containers/Register";

function App() {
  return (
    <>
      <StatusBar barStyle={styles.statusbar} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen
            name="Login"
            initialRouteName={"login"}
            options={{
              headerShown: false,
            }}
          >
            {(props) => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            /* options={{
              headerShown: false,
            }} */
          >
            {(props) => <Register {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  statusbar: { color: "#aaaaaa" },
});
