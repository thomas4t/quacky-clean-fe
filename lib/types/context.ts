import { CategoryType } from "./category";
import { LoginData } from "./user";
import { AddToCartPayload, CartProductType } from "./product";

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

export type CartContextState = {
  items: CartProductType[];
  loadItems: () => void;
  // returns all products
  addItem: (payload: AddToCartPayload) => Promise<CartProductType[] | null>;
  clearItems: () => void;
};
