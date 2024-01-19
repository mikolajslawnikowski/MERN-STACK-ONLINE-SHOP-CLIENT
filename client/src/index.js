import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductsContextProvider } from "./context/ProductsContext";
import { AuthContextProvider } from "./context/AuthContext";
import { OpinionsContextProvider } from "./context/OpinionsContext";
import { CartContextProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <OpinionsContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </OpinionsContextProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
