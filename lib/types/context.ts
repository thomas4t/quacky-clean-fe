import { CategoryType } from "./category";
import { LoginData } from "./user";

export type AccountContextState = {
  activeUser: string;
  isLogged: boolean;
  login: (payload: LoginData) => Promise<boolean>;
  logout: () => void;
};

export type CategoriesContextState = {
  categories: CategoryType[];
  updateCategories: (payload?: CategoryType[]) => void;
};
