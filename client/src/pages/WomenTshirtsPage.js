import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ProductDetails from "../components/ProductDetails";
import GenderButtons from "../components/GenderButtons";
import WomenCategoryButtons from "../components/WomenCategoryButtons";

const WomenTshirtsPage = () => {
  const [tshirts, setTshirts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTshirts, setFilteredTshirts] = useState([]);
  const { user } = useAuthContext();

  const fetchProducts = useCallback((sortOption) => {
    let url = "/api/products/women/tshirts";
    if (sortOption) {
      url += `/${sortOption}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setTshirts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let filtered = tshirts;

    if (minPrice) {
      filtered = filtered.filter((tshirt) => tshirt.price >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((tshirt) => tshirt.price <= maxPrice);
    }

    if (searchTerm) {
      filtered = filtered.filter((tshirt) =>
        tshirt.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTshirts(filtered);
  }, [tshirts, minPrice, maxPrice, searchTerm]);

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
        {filteredTshirts.map((tshirt) => (
          <ProductDetails key={tshirt.id} product={tshirt} user={user} />
        ))}
      </div>
    </div>
  );
};

export default WomenTshirtsPage;
