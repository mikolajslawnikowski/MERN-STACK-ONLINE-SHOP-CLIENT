import { useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import ProductDetails from "../components/ProductDetails";
import GenderButtons from "../components/GenderButtons";
import WomenCategoryButtons from "../components/WomenCategoryButtons";

const WomenPage = () => {
  const { products, dispatch } = useProductsContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products/women");

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <GenderButtons />
      <WomenCategoryButtons />
      <div className="products">
        {products &&
          products.map((product) => (
            <ProductDetails product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
};

export default WomenPage;
