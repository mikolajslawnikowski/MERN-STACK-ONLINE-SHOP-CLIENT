import { useState, useEffect } from "react";
import { useCartContext } from "../hooks/useCartContext";
import DeliveryForm from "../components/DeliveryForm";
import { useNavigate } from "react-router-dom";

function Delivery() {
  const { cart } = useCartContext();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);

      for (let productId in cart) {
        const product = data.find((product) => product._id === productId);
        if (product && cart[productId] > product.quantity) {
          navigate("/cart");
          return;
        }
      }
    };

    fetchProducts();
  }, [cart, navigate]);

  return (
    <div>
      <DeliveryForm />
    </div>
  );
}

export default Delivery;
