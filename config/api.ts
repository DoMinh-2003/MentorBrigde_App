import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
   baseURL: "http://103.200.20.149:8080/api/", // android
  // baseURL: "http://localhost:8080/api/", // ios
});

api.interceptors.request.use(
   async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
   (error) => {
    return Promise.reject(error);
  }
);

export default api;