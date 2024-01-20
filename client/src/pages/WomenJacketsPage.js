import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ProductDetails from "../components/ProductDetails";
import GenderButtons from "../components/GenderButtons";
import WomenCategoryButtons from "../components/WomenCategoryButtons";

const WomenJacketsPage = () => {
  const [jackets, setJackets] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJackets, setFilteredJackets] = useState([]);
  const { user } = useAuthContext();

  const fetchProducts = useCallback((sortOption) => {
    let url = "/api/products/women/jackets";
    if (sortOption) {
      url += `/${sortOption}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setJackets(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let filtered = jackets;

    if (minPrice) {
      filtered = filtered.filter((jacket) => jacket.price >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((jacket) => jacket.price <= maxPrice);
    }

    if (searchTerm) {
      filtered = filtered.filter((jacket) =>
        jacket.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJackets(filtered);
  }, [jackets, minPrice, maxPrice, searchTerm]);

  const handleSortChange = (event) => {
    fetchProducts(event.target.value);
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
      <WomenCategoryButtons />
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
        {filteredJackets.map((jacket) => (
          <ProductDetails key={jacket._id} product={jacket} user={user} />
        ))}
      </div>
    </div>
  );
};

export default WomenJacketsPage;
