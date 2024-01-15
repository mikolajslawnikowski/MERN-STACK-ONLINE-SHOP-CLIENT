import { useEffect, useState, useCallback } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import ProductDetails from "../components/ProductDetails";
import GenderButtons from "../components/GenderButtons";
import WomenCategoryButtons from "../components/WomenCategoryButtons";

const WomenPage = () => {
  const { products, dispatch } = useProductsContext();
  const [sortOption, setSortOption] = useState("");

  const fetchProducts = useCallback(
    (sortOption) => {
      let url = "/api/products/women";
      if (sortOption) {
        url += `/${sortOption}`;
      }

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          dispatch({ type: "SET_PRODUCTS", payload: data });
        })
        .catch((error) => console.error("Error:", error));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchProducts(sortOption);
  }, [fetchProducts, sortOption]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
      <GenderButtons />
      <WomenCategoryButtons />
      <select onChange={handleSortChange}>
        <option value="">Sort by...</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
        <option value="date_asc">Date (Oldest to Newest)</option>
        <option value="date_desc">Date (Newest to Oldest)</option>
      </select>
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
