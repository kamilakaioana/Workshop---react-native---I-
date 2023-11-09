import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

class AuthService {
  async login(email: string, password: string) {
    const response = await api.post("/auth/local/signin", {
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.access_token);
    return response;
  }

  async signup(name: string, email: string, password: string) {
    const response = await api.post("/user/local/signup", {
      name,
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.access_token);
    return response;
  }
}

export const authService = new AuthService();
