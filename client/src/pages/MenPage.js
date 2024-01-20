import { useEffect, useState, useCallback } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import ProductDetails from "../components/ProductDetails";
import GenderButtons from "../components/GenderButtons";
import MenCategoryButtons from "../components/MenCategoryButtons";

const MenPage = () => {
  const { products, dispatch } = useProductsContext();
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = useCallback(
    (sortOption) => {
      let url = "/api/products/men";
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

  useEffect(() => {
    let filtered = products;

    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, minPrice, maxPrice, searchTerm]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <GenderButtons />
      <MenCategoryButtons />
      <select onChange={handleSortChange}>
        <option value="">Sort by...</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
        <option value="date_asc">Date (Oldest to Newest)</option>
        <option value="date_desc">Date (Newest to Oldest)</option>
        <option value="rating_asc">Rating (Low to High)</option>
        <option value="rating_desc">Rating (High to Low)</option>
      </select>
      <input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={handleMinPriceChange}
      />
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="products">
        {filteredProducts &&
          filteredProducts.map((product) => (
            <ProductDetails product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
};

export default MenPage;
