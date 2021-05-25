import React from "react";
import CategoryAPI from "../api/category";
import { useCategories } from "../context/CategoriesContext";
import { useDidMount } from "../hooks/useDidMount";
import { CategoryType } from "../types/category";

export const getGlobalData = async () => {
  const categories = await CategoryAPI.getAll();
  return { categories };
};

// Whoever reads this, appreciate it
// Because holy !&#@# ... was it painful to write
type WithGlobalDataProps = {
  categories: CategoryType[];
};
export const withGlobalData = <T extends {}>(
  Component: React.ComponentType<T>
): React.FC<T & WithGlobalDataProps> => ({
  categories,
  ...props
}: WithGlobalDataProps) => {
  //Note
  //Whenever you need any more global data preloaded "server-side",
  //they have to be added here and in getGlobalData func above
  const { updateCategories } = useCategories();
  useDidMount(() => {
    updateCategories(categories);
  });
  return <Component {...(props as T)} />;
};
