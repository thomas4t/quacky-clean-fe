import axios from "axios";
import { BACKEND_URL } from "./constants";

// Set config defaults when creating the instance
const webClient = axios.create({
  baseURL: BACKEND_URL,
});

export default webClient;
