import { AddToCartPayload, CartProductType } from "../types/product";
import webClient from "../utils/webClient";
import { AxiosResponse } from "axios";

const CartAPI = {
  //Note: we can get 401 error if user is not logged yet
  getAll: async (): Promise<AxiosResponse<CartProductType[]>> => {
    try {
      return await webClient.get(`/cart`);
    } catch (err) {
      return err.response;
    }
  },
  addItem: async (
    payload: AddToCartPayload
  ): Promise<AxiosResponse<CartProductType[]>> => {
    try {
      return await webClient.post(`/cart/add`, {
        ...payload,
      });
    } catch (err) {
      return err.response;
    }
  },
  clearCart: async (): Promise<AxiosResponse> => {
    try {
      return await webClient.delete(`/cart`);
    } catch (err) {
      return err.response;
    }
  },
};

export default CartAPI;
