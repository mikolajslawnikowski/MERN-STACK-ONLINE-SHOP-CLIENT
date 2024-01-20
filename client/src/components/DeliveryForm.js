import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";

const DeliveryForm = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { cart, dispatch } = useCartContext();
  const [products, setProducts] = useState([]);
  const [isCourierAvailable, setIsCourierAvailable] = useState(true);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    delivery: "",
  });

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsOrderConfirmed(true);
  };

  const handleConfirmOrder = async () => {
    const order = {
      userID: user ? user._id : null,
      Name: form.name,
      Address: form.address,
      Email: form.email,
      PhoneNumber: form.phone,
      DeliveryMethod: form.delivery,
      Items: Object.keys(cart).map((productId) => {
        const product = products.find((product) => product._id === productId);
        return {
          productId,
          quantity: cart[productId],
          price: product.price,
        };
      }),
      TotalPrice: Object.keys(cart).reduce((total, productId) => {
        const product = products.find((product) => product._id === productId);
        return total + product.price * cart[productId];
      }, 0),
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      console.log("Order created successfully");

      for (const item of order.Items) {
        const productQuantity = item.quantity;
        const productResponse = await fetch(`/api/products/${item.productId}`);
        const productData = await productResponse.json();
        const itemQuantity = productData.quantity;

        const updatedQuantityResponse = await fetch(
          `/api/products/${item.productId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: itemQuantity - productQuantity,
            }),
          }
        );

        if (!updatedQuantityResponse.ok) {
          console.error("Failed to update product quantity");
        }
        dispatch({ type: "CLEAR_CART" });
        navigate("/");
      }
    } else {
      console.error("Failed to create order");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);

      const allProductsAvailableForCourier = Object.keys(cart).every(
        (productId) => {
          const product = data.find((product) => product._id === productId);
          return product && product.shipping2;
        }
      );

      setIsCourierAvailable(allProductsAvailableForCourier);
    };

    fetchProducts();
  }, [cart]);

  return (
    <div>
      <p>Your products:</p>
      {Object.keys(cart).map((productId) => {
        const product = products
          ? products.find((product) => product._id === productId)
          : null;
        const productQuantity = cart[productId];
        return product ? (
          <div key={productId}>
            <p>Name: {product.name}</p>
            <p>Quantity: {productQuantity}</p>
            <p>
              PRODUCT PRICE: {(product.price * productQuantity).toFixed(2)}
            </p>{" "}
          </div>
        ) : null;
      })}
      <h2>Delivery Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={handleInputChange} />
        </label>
        <label>
          Phone number:
          <input type="number" name="phone" onChange={handleInputChange} />
        </label>
        <label>
          Delivery method:
          <div>
            <label>
              <input
                type="radio"
                value="Post"
                name="delivery"
                onChange={handleInputChange}
              />{" "}
              Post
            </label>
            <label>
              <input
                type="radio"
                value="Courier"
                name="delivery"
                disabled={!isCourierAvailable}
                onChange={handleInputChange}
              />{" "}
              Courier
            </label>
          </div>
        </label>
        <input type="submit" value="Submit" />
      </form>
      {isOrderConfirmed && (
        <div>
          <p>Confirm your order</p>
          <button onClick={handleConfirmOrder}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;
