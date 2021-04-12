import React, { createContext, useContext, useState } from "react";
import UserAPI from "../api/user";
import { useDidMount } from "../hooks/useDidMount";
import { AccountContextState } from "../types/context";
import { LoginData } from "../types/user";
import { localStorageApi } from "../utils/localStorage";
import webClient from "../utils/webClient";

const initialValues: AccountContextState = {
  activeUser: "",
  isLogged: false,
  login: ({}) =>
    new Promise((resolve) => {
      resolve(false);
    }),
  logout: () => {},
};

const AccountContext = createContext<AccountContextState>(initialValues);

export const AccountProvider: React.FC = ({ children }) => {
  const [activeUser, setActiveUser] = useState(initialValues.activeUser);
  const [isLogged, setIsLogged] = useState(initialValues.isLogged);

  const updateLocalJWT = (token: string) => {
    //Update local storage value
    localStorageApi.setValue("token", token);
  };

  const clearJWT = () => {
    localStorageApi.setValue("token", "");
    delete webClient.defaults.headers.common["Authorization"];
  };

  const login = async (payload: LoginData): Promise<boolean> => {
    //TODO change response data to include errors?
    const res = await UserAPI.login(payload);

    let didOkay = false;
    if (res.status === 201) {
      didOkay = true;
      updateLocalJWT(res.data.access_token);
      setActiveUser(payload.username);
      setIsLogged(true);
    }

    return didOkay;
  };

  const logout = async () => {
    clearJWT();
    //Reload app
    window.location.replace("/");
    setActiveUser("");
    setIsLogged(false);
  };

  useDidMount(async () => {
    const initialCheck = async () => {
      const token = localStorageApi.getValue("token") as string;
      if (token) {
        const res = await UserAPI.validateToken(token);
        if (res.status === 200) {
          updateLocalJWT(token);
          setActiveUser(res.data.username);
          setIsLogged(true);
        }
      }
    };
    await initialCheck();
  });

  return (
    <AccountContext.Provider
      value={{
        activeUser,
        isLogged,
        login,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
