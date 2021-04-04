import { CategoryType } from "../types/category";
import { ProductType } from "../types/product";
import webClient from "../utils/webClient";

const ProductAPI = {
  get: async (
    categoryId: CategoryType["ID_Category"]
  ): Promise<ProductType[]> => {
    try {
      const res = await webClient.get(`/products/category/${categoryId}`);
      const data = await res.data;
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
};

export default ProductAPI;
