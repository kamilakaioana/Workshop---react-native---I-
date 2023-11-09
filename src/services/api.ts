import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "https://social-media-api-c3rt.onrender.com",
});

api.interceptors.request.use(async (req) => {
  req.headers = req.headers || {};
  const token = await AsyncStorage.getItem("token");
  if (token && token !== null) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
