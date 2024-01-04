import { useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

// components
import ProductDetails from "../components/ProductDetails";
import ProductForm from "../components/ProductForm";

const Home = () => {
  const { products, dispatch } = useProductsContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="products">
        {products &&
          products.map((product) => (
            <ProductDetails product={product} key={product._id} />
          ))}
      </div>
      <ProductForm />
    </div>
  );
};

export default Home;
