import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, ReactNode } from "react";
import { AxiosError } from "axios";
import { userService } from "../services/user";
import { IUser } from "../interfaces/interfaces";

type AuthContextData = {
  user: IUser;
  signOut: () => void;
  updateUserSelf: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser);

  async function signOut() {
    setUser({} as IUser);
    await AsyncStorage.removeItem("token");
  }

  async function updateUserSelf() {
    try {
      const { data } = await userService.getUserSelf();
      setUser(data ?? {});
    } catch (error) {
      if (error instanceof AxiosError && error.status === 401) {
        setUser({} as IUser);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, signOut, updateUserSelf }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
