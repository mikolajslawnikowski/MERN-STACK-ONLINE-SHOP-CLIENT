import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ProductDetails from "../components/ProductDetails";
import GenderButtons from "../components/GenderButtons";
import MenCategoryButtons from "../components/MenCategoryButtons";

const MenPantsPage = () => {
  const [pants, setPants] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPants, setFilteredPants] = useState([]);
  const { user } = useAuthContext();

  const fetchProducts = (sortOption) => {
    let url = "/api/products/men/pants";
    if (sortOption) {
      url += `/${sortOption}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setPants(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = pants;

    if (minPrice) {
      filtered = filtered.filter((pants) => pants.price >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((pants) => pants.price <= maxPrice);
    }

    if (searchTerm) {
      filtered = filtered.filter((pants) =>
        pants.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPants(filtered);
  }, [pants, minPrice, maxPrice, searchTerm]);

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
        {filteredPants.map((pants) => (
          <ProductDetails key={pants.id} product={pants} user={user} />
        ))}
      </div>
    </div>
  );
};

export default MenPantsPage;
