import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    // case "ADD_TO_CART":
    //   return { ...state, [action.payload]: (state[action.payload] || 0) + 1 };
    case "ADD_TO_CART":
      return {
        ...state,
        [action.payload.productId]:
          (state[action.payload.productId] || 0) + action.payload.quantity,
      };
    case "SET_QUANTITY":
      return {
        ...state,
        [action.payload.productId]: action.payload.quantity,
      };
    case "REMOVE_FROM_CART":
      const newState = { ...state };
      delete newState[action.payload.productId];
      return newState;

    case "CLEAR_CART":
      return {};
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {}, () => {
    const localData = localStorage.getItem("cart");
    return localData && localData !== "undefined" ? JSON.parse(localData) : {};
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cart" && !e.newValue) {
        dispatch({ type: "CLEAR_CART" });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  //   const addToCart = (productId) => {
  //     dispatch({ type: "ADD_TO_CART", payload: productId });
  //   };

  const addToCart = (productId, quantity) => {
    dispatch({ type: "ADD_TO_CART", payload: { productId, quantity } });
  };

  const setQuantity = (productId, quantity) => {
    dispatch({ type: "SET_QUANTITY", payload: { productId, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, dispatch, addToCart, setQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
