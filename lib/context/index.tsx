import React from "react";
import { AccountProvider } from "./AccountContext";
import { CategoriesProvider } from "./CategoriesContext";
import { CartProvider } from "./CartContext";

const ContextProvider: React.FC = ({ children }) => (
  <AccountProvider>
    <CartProvider>
      <CategoriesProvider>{children}</CategoriesProvider>
    </CartProvider>
  </AccountProvider>
);

export default ContextProvider;
