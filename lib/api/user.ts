import { AxiosResponse } from "axios";
import {
  LoginData,
  LoginResponse,
  RegistrationPayload,
  RegistrationResponse,
  TokenValidationPayload,
} from "../types/user";
import webClient from "../utils/webClient";

const UserAPI = {
  /**
   * Validates current JWT Token
   */
  validateToken: async (
    token: string
  ): Promise<AxiosResponse<TokenValidationPayload>> => {
    try {
      return await webClient.get(`/auth/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      return err.response;
    }
  },
  login: async (payload: LoginData): Promise<AxiosResponse<LoginResponse>> => {
    try {
      //TODO this should probably be in request body
      return await webClient.post(
        `/auth/login?username=${payload.username}&password=${payload.password}`
      );
    } catch (error) {
      return error.response;
    }
  },
  register: async (
    payload: RegistrationPayload
  ): Promise<AxiosResponse<RegistrationResponse>> => {
    try {
      return await webClient.post("/auth/register", { ...payload });
    } catch (error) {
      return error.response;
    }
  },
};

export default UserAPI;
