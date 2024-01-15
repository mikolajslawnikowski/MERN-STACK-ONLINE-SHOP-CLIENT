import { useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import ProductDetails from "../components/ProductDetails";
import GenderButtons from "../components/GenderButtons";
import MenCategoryButtons from "../components/MenCategoryButtons";

const MenPage = () => {
  const { products, dispatch } = useProductsContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products/men");

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
      <MenCategoryButtons />
      <div className="products">
        {products &&
          products.map((product) => (
            <ProductDetails product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
};

export default MenPage;
