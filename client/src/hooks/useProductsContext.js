import { ProductsContext } from "../context/ProductsContext";
import { useContext } from "react";

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw Error(
      "useProductsContext must not be used inside ProductsContextProvider"
    );
  }

  return context;
};
