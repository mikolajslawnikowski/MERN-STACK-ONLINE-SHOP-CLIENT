import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const WomenCategoryButtons = () => {
  const { dispatch } = useContext(ProductsContext);

  const handleButtonClick = (category) => {
    fetch("/api/products/women/" + category)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_PRODUCTS", payload: data }))
      .catch((error) => console.error("Error:", error));
  };

  const handleShowAllClick = () => {
    fetch("/api/products/women")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_PRODUCTS", payload: data }))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <button onClick={handleShowAllClick}>Show all female products</button>
      <button onClick={() => handleButtonClick("tshirts")}>T-shirts</button>
      <button onClick={() => handleButtonClick("hoodies")}>Hoodies</button>
      <button onClick={() => handleButtonClick("jackets")}>Jackets</button>
      <button onClick={() => handleButtonClick("pants")}>Pants</button>
      <button onClick={() => handleButtonClick("shoes")}>Shoes</button>
    </div>
  );
};

export default WomenCategoryButtons;
