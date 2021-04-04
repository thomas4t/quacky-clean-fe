import React, { createContext, useContext, useState } from "react";
import CategoryAPI from "../api/category";
import { CategoryType } from "../types/category";
import { CategoriesContextState } from "../types/context";

const initialValues: CategoriesContextState = {
  categories: [],
  updateCategories: () => {},
};

const CategoriesContext = createContext<CategoriesContextState>(initialValues);

export const CategoriesProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = useState<CategoryType[]>(
    initialValues.categories
  );

  const updateCategories = async (payload?: CategoryType[]) => {
    if (payload) {
      setCategories(payload);
    } else {
      const ctgs = await CategoryAPI.getAll();
      setCategories(ctgs);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        updateCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoriesContext);
};
