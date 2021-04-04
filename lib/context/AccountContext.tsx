import React, { createContext, useContext, useEffect, useState } from "react";
import UserAPI from "../api/user";
import { useDidMount } from "../hooks/useDidMount";
import { AccountContextState } from "../types/context";
import { LoginData } from "../types/user";
import { localStorageApi } from "../utils/localStorage";
import webClient from "../utils/webClient";

const initialValues: AccountContextState = {
  activeUser: "",
  isLogged: false,
  login: ({}) => {},
  logout: () => {},
};

const AccountContext = createContext<AccountContextState>(initialValues);

export const AccountProvider: React.FC = ({ children }) => {
  const [activeUser, setActiveUser] = useState(initialValues.activeUser);
  const [isLogged, setIsLogged] = useState(initialValues.isLogged);

  const updateJWT = (token: string) => {
    //Update axios instance
    webClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //Update local storage value
    localStorageApi.setValue("token", token);
  };

  const clearJWT = () => {
    localStorageApi.setValue("token", "");
    webClient.defaults.headers.common["Authorization"] = "";
  };

  const login = async (payload: LoginData) => {
    //TODO change response data to include errors?
    const res = await UserAPI.login(payload);
    if (res) {
      updateJWT(res.access_token);
      setIsLogged(true);
      setActiveUser(payload.username);
    }
  };

  const logout = async () => {
    clearJWT();
    setActiveUser("");
    setIsLogged(false);
  };

  useDidMount(() => {
    const initialCheck = async () => {
      const validation = await UserAPI.validateCurrentToken();
      if (validation.isValid) {
        updateJWT(validation.token);
        setActiveUser(validation.username);
        setIsLogged(true);
      }
    };
    initialCheck();
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