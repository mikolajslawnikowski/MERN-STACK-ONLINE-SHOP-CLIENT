import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ProductDetails from "../components/ProductDetails";
import GenderButtons from "../components/GenderButtons";
import WomenCategoryButtons from "../components/WomenCategoryButtons";

const WomenHoodiesPage = () => {
  const [hoodies, setHoodies] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHoodies, setFilteredHoodies] = useState([]);
  const { user } = useAuthContext();

  const fetchProducts = useCallback((sortOption) => {
    let url = "/api/products/women/hoodies";
    if (sortOption) {
      url += `/${sortOption}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setHoodies(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let filtered = hoodies;

    if (minPrice) {
      filtered = filtered.filter((hoodie) => hoodie.price >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((hoodie) => hoodie.price <= maxPrice);
    }

    if (searchTerm) {
      filtered = filtered.filter((hoodie) =>
        hoodie.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredHoodies(filtered);
  }, [hoodies, minPrice, maxPrice, searchTerm]);

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
        {filteredHoodies.map((hoodie) => (
          <ProductDetails key={hoodie._id} product={hoodie} user={user} />
        ))}
      </div>
    </div>
  );
};

export default WomenHoodiesPage;
