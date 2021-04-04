import { CategoryType } from "./category";
import { LoginData, LoginResponse } from "./user";

export type AccountContextState = {
  activeUser: string;
  isLogged: boolean;
  login: (payload: LoginData) => void;
  logout: () => void;
};

export type CategoriesContextState = {
  categories: CategoryType[];
  updateCategories: (payload?: CategoryType[]) => void;
};
