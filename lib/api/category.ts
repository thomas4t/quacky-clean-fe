import { CategoryType } from "../types/category";
import webClient from "../utils/webClient";

const CategoryAPI = {
  getAll: async (): Promise<CategoryType[]> => {
    try {
      const res = await webClient.get("/categories");
      const data = await res.data;
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
};

export default CategoryAPI;
