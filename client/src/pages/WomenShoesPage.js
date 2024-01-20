import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ProductDetails from "../components/ProductDetails";
import GenderButtons from "../components/GenderButtons";
import WomenCategoryButtons from "../components/WomenCategoryButtons";

const WomenShoesPage = () => {
  const [shoes, setShoes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShoes, setFilteredShoes] = useState([]);
  const { user } = useAuthContext();

  const fetchProducts = useCallback((sortOption) => {
    let url = "/api/products/women/shoes";
    if (sortOption) {
      url += `/${sortOption}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setShoes(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let filtered = shoes;

    if (minPrice) {
      filtered = filtered.filter((shoes) => shoes.price >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((shoes) => shoes.price <= maxPrice);
    }

    if (searchTerm) {
      filtered = filtered.filter((shoes) =>
        shoes.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredShoes(filtered);
  }, [shoes, minPrice, maxPrice, searchTerm]);

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
        {filteredShoes.map((shoes) => (
          <ProductDetails key={shoes.id} product={shoes} user={user} />
        ))}
      </div>
    </div>
  );
};

export default WomenShoesPage;
