import { AxiosResponse } from "axios";
import {
  LoginData,
  LoginResponse,
  TokenValidationPayload,
} from "../types/user";
import { localStorageApi } from "../utils/localStorage";
import webClient from "../utils/webClient";

const UserAPI = {
  //   current: async () => {
  //     const user: any = window.localStorage.getItem("user");
  //     const token = user?.token;
  //     try {
  //       const response = await axios.get(`/user`, {
  //         headers: {
  //           Authorization: `Token ${encodeURIComponent(token)}`,
  //         },
  //       });
  //       return response;
  //     } catch (error) {
  //       return error.response;
  //     }
  //   },
  /**
   * Validates current JWT Token
   * @returns whether token is present && valid
   */
  validateCurrentToken: async (): Promise<
    | ({ isValid: true; token: string } & TokenValidationPayload)
    | { isValid: false }
  > => {
    const token = localStorageApi.getValue("token");
    if (token) {
      //Token has been saved to storage before
      try {
        const res = await webClient.get(`/auth/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          //Token is valid
          return { isValid: true, token, ...res.data };
        }
      } catch (err) {
        console.error(err);
      }
    }
    //Token hasn't been found or is invalid
    return { isValid: false };
  },
  login: async (payload: LoginData): Promise<AxiosResponse<LoginResponse>> => {
    try {
      //TODO this should probably be in request body
      const res = await webClient.post(
        `/auth/login?username=${payload.username}&password=${payload.password}`
      );
      return res;
    } catch (error) {
      return error.response;
    }
  },
  //TODO
  //   register: async (username, email, password) => {
  //     try {
  //       const response = await axios.post(
  //         `${SERVER_BASE_URL}/users`,
  //         JSON.stringify({ user: { username, email, password } }),
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       return response;
  //     } catch (error) {
  //       return error.response;
  //     }
  //   },
  //   save: async (user) => {
  //     try {
  //       const response = await axios.put(
  //         `${SERVER_BASE_URL}/user`,
  //         JSON.stringify({ user }),
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       return response;
  //     } catch (error) {
  //       return error.response;
  //     }
  //   },
  //   follow: async (username) => {
  //     const user: any = JSON.parse(window.localStorage.getItem("user"));
  //     const token = user?.token;
  //     try {
  //       const response = await axios.post(
  //         `${SERVER_BASE_URL}/profiles/${username}/follow`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Token ${encodeURIComponent(token)}`,
  //           },
  //         }
  //       );
  //       return response;
  //     } catch (error) {
  //       return error.response;
  //     }
  //   },
  //   unfollow: async (username) => {
  //     const user: any = JSON.parse(window.localStorage.getItem("user"));
  //     const token = user?.token;
  //     try {
  //       const response = await axios.delete(
  //         `${SERVER_BASE_URL}/profiles/${username}/follow`,
  //         {
  //           headers: {
  //             Authorization: `Token ${encodeURIComponent(token)}`,
  //           },
  //         }
  //       );
  //       return response;
  //     } catch (error) {
  //       return error.response;
  //     }
  //   },
  //TODO
  //   get: async (username: string) =>
  //     axios.get(`${SERVER_BASE_URL}/profiles/${username}`),
};

export default UserAPI;
