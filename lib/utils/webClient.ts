import axios from "axios";
import { BACKEND_URL } from "./constants";
import { localStorageApi } from "./localStorage";

// Set config defaults when creating the instance
const webClient = axios.create({
  baseURL: BACKEND_URL,
  // headers: { Authorization: "Bearer " + token },
});

// Request interceptor for API calls
webClient.interceptors.request.use(
  async (config) => {
    const token = localStorageApi.getValue("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error).then((r) => {
      console.error(r);
    });
  }
);

export default webClient;
