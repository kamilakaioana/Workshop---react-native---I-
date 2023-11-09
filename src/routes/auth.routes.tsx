import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home";
import Profile from "../screens/profile";

const { Navigator, Screen } = createBottomTabNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name={"Perfil"}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name={"user"}
              size={26}
              color={focused ? "purple" : "gray"}
            />
          ),
        }}
      />

      <Screen
        name={"Home"}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name={"home"}
              size={26}
              color={focused ? "purple" : "gray"}
            />
          ),
        }}
      />
    </Navigator>
  );
}
