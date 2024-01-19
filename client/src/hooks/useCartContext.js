import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("useCartContext must not be used insideCartContextProvider");
  }

  return context;
};
