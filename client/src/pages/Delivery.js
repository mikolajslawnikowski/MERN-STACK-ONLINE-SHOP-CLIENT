import { useState, useEffect } from "react";
import { useCartContext } from "../hooks/useCartContext";
import DeliveryForm from "../components/DeliveryForm";

function Delivery() {
  const { cart } = useCartContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const calculateTotalPrice = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const product = products.find((product) => product._id === productId);
      return total + (product ? product.price * cart[productId] : 0);
    }, 0);
  };

  return (
    <div>
      <DeliveryForm />
      <p>Total price: {calculateTotalPrice().toFixed(2)}</p>
    </div>
  );
}

export default Delivery;
