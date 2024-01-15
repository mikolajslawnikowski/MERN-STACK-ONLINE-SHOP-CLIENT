// import { useContext } from "react";
// import { ProductsContext } from "../context/ProductsContext";

// const MenCategoryButtons = () => {
//   const { dispatch } = useContext(ProductsContext);

//   const handleButtonClick = (category) => {
//     fetch("/api/products/men/" + category)
//       .then((response) => response.json())
//       .then((data) => dispatch({ type: "SET_PRODUCTS", payload: data }))
//       .catch((error) => console.error("Error:", error));
//   };

//   const handleShowAllClick = () => {
//     fetch("/api/products/men")
//       .then((response) => response.json())
//       .then((data) => dispatch({ type: "SET_PRODUCTS", payload: data }))
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div>
//       <button onClick={handleShowAllClick}>Show all male products</button>
//       <button onClick={() => handleButtonClick("tshirts")}>T-shirts</button>
//       <button onClick={() => handleButtonClick("hoodies")}>Hoodies</button>
//       <button onClick={() => handleButtonClick("jackets")}>Jackets</button>
//       <button onClick={() => handleButtonClick("pants")}>Pants</button>
//       <button onClick={() => handleButtonClick("shoes")}>Shoes</button>
//     </div>
//   );
// };

// export default MenCategoryButtons;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

const MenCategoryButtons = () => {
  const { dispatch } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleButtonClick = (category) => {
    fetch("/api/products/men/" + category)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_PRODUCTS", payload: data });
        navigate("/men/" + category);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <button onClick={() => handleButtonClick("tshirts")}>T-shirts</button>
      <button onClick={() => handleButtonClick("hoodies")}>Hoodies</button>
      <button onClick={() => handleButtonClick("jackets")}>Jackets</button>
      <button onClick={() => handleButtonClick("pants")}>Pants</button>
      <button onClick={() => handleButtonClick("shoes")}>Shoes</button>
    </div>
  );
};

export default MenCategoryButtons;
