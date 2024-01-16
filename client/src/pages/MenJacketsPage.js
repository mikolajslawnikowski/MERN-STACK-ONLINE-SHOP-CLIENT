import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ProductDetails from "../components/ProductDetails";
import GenderButtons from "../components/GenderButtons";
import MenCategoryButtons from "../components/MenCategoryButtons";

const MenJacketsPage = () => {
  const [jackets, setJackets] = useState([]);
  const { user } = useAuthContext();

  const fetchProducts = (sortOption) => {
    let url = "/api/products/men/jackets";
    if (sortOption) {
      url += `/${sortOption}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setJackets(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSortChange = (event) => {
    fetchProducts(event.target.value);
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
      <div className="products">
        {jackets.map((jacket) => (
          <ProductDetails key={jacket._id} product={jacket} user={user} />
        ))}
      </div>
    </div>
  );
};

export default MenJacketsPage;
