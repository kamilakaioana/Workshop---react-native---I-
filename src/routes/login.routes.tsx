import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import Cadastro from "../screens/cadastro";
const { Navigator, Screen } = createStackNavigator();

export function LoginRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="Cadastro" component={Cadastro} />
    </Navigator>
  );
}
