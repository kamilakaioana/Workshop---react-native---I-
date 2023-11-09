import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { LoginRoutes } from "./login.routes";
import { useAuth } from "../hooks/useAuth";

export enum ROUTES {
  Home = "Home",
  Search = "Search",
  Perfil = "Perfil",
  Login = "Login",
  Cadastro = "Cadastro",
}

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.email ? <AuthRoutes /> : <LoginRoutes />}
    </NavigationContainer>
  );
}
