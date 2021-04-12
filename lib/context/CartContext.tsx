import React, { createContext, useContext, useState } from "react";
import { CartContextState } from "../types/context";
import CartAPI from "../api/cart";
import { AddToCartPayload, CartProductType } from "../types/product";

const initialValues: CartContextState = {
  items: [],
  loadItems: () => {},
  addItem: ({}) =>
    new Promise((resolve) => {
      resolve([]);
    }),
  clearItems: () => {},
};

const CartContext = createContext<CartContextState>(initialValues);

export const CartProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState<CartContextState["items"]>(
    initialValues.items
  );

  const loadItems = async () => {
    const res = await CartAPI.getAll();
    // if(res.)
    //setItems
    if (res.status === 200) {
      setItems(res.data);
    }
  };

  const addItem = async (
    payload: AddToCartPayload
  ): Promise<CartProductType[] | null> => {
    const res = await CartAPI.addItem(payload);
    return res.data || null;
  };

  const clearItems = async () => {
    const res = await CartAPI.clearCart();
    if (res.status === 200) {
      setItems([]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        loadItems,
        addItem,
        clearItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
