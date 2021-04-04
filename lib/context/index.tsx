import React from "react";
import { AccountProvider } from "./AccountContext";
import { CategoriesProvider } from "./CategoriesContext";

const ContextProvider: React.FC = ({ children }) => (
  <AccountProvider>
    <CategoriesProvider>{children}</CategoriesProvider>
  </AccountProvider>
);

export default ContextProvider;
