import { useEffect } from "react";
import { useCartContext } from "../hooks/useCartContext";
import { useProductsContext } from "../hooks/useProductsContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setQuantity, removeFromCart } = useCartContext();
  const { products, dispatch } = useProductsContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify({}));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: data });
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, event) => {
    setQuantity(productId, Number(event.target.value));
  };

  const calculateTotalPrice = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const product = products.find((product) => product._id === productId);
      return total + (product ? product.price * cart[productId] : 0);
    }, 0);
  };

  const isAnyProductOverQuantity = () => {
    return Object.keys(cart).some((productId) => {
      const product = products.find((product) => product._id === productId);
      return product && cart[productId] > product.quantity;
    });
  };

  return (
    <div>
      <h2>Cart</h2>
      {Object.keys(cart).map((productId) => {
        const product = products
          ? products.find((product) => product._id === productId)
          : null;
        const productQuantity = cart[productId];
        return product ? (
          <div key={productId}>
            <p>Name: {product.name}</p>
            <p>ID: {product._id}</p>
            <img src={product.photo} alt={product.name} />
            <p>In cart: {productQuantity}</p>
            {productQuantity > product.quantity && (
              <p>
                The number of products in the basket exceeds the number of
                available products
              </p>
            )}
            <p>In stock: {product.quantity}</p>
            <select
              defaultValue={productQuantity}
              onChange={(event) => handleQuantityChange(productId, event)}
            >
              {[...Array(product.quantity).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
            <button onClick={() => removeFromCart(productId)}>DELETE</button>
            <p>
              PRODUCT PRICE: {(product.price * productQuantity).toFixed(2)}
            </p>{" "}
          </div>
        ) : null;
      })}
      {Object.keys(cart).length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <p>Total price: {calculateTotalPrice().toFixed(2)}</p>{" "}
          <p>
            Total price with default shipping option:{" "}
            {(calculateTotalPrice() + 10).toFixed(2)}
          </p>
          <button
            disabled={isAnyProductOverQuantity()}
            onClick={() => navigate("/delivery")}
          >
            DELIVERY FORM
          </button>{" "}
        </>
      )}
    </div>
  );
};

export default Cart;
