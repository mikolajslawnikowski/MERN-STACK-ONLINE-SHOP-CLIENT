import { useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { Link } from "react-router-dom";
import GenderButtons from "../components/GenderButtons";
// import { useAuthContext } from "../hooks/useAuthContext";

// components
import ProductDetails from "../components/ProductDetails";
// import ProductForm from "../components/ProductForm";

const Home = () => {
  const { products, dispatch } = useProductsContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    // <div className="home">
    //   <div className="products">
    //     {products &&
    //       products.map((product) => (
    //         <ProductDetails product={product} key={product._id} />
    //       ))}
    //   </div>
    // </div>
    <div>
      {/* <button>
        <Link to="/men">MEN</Link>
      </button>

      <button>
        <Link to="/women">WOMEN</Link>
      </button> */}
      <GenderButtons />
    </div>
  );
};

export default Home;
