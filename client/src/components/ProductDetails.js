import { useProductsContext } from "../hooks/useProductsContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import { format } from "date-fns";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    addToCart(product._id, 1);
  };

  const handleClick = async () => {
    const response = await fetch("/api/products/" + product._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="product-details">
      <Link to={`/${product._id}`}>
        <h4>{product.name}</h4>
      </Link>
      <img src={product.photo} alt={product.name} />
      <p>
        <strong>Product price: </strong>
        {product.price}
      </p>
      <p>
        <strong>Product price with cheapest shipment: </strong>
        {product.price + 10}
      </p>
      <p>
        <strong>Description: </strong>
        {product.shortDescription}
      </p>
      <p>
        <strong>Quantity: </strong>
        {product.quantity}
      </p>
      <p>{format(new Date(product.createdAt), "dd-LL-yyyy")}</p>
      {product.quantity > 0 ? (
        <button onClick={() => handleAddToCart(product._id)}>
          ADD TO CART
        </button>
      ) : (
        <p>PRODUCT IS OUT OF STOCK</p>
      )}{" "}
      {user && user.admin && (
        <span className="material-symbols-outlined" onClick={handleClick}>
          DELETE
        </span>
      )}
    </div>
  );
};

export default ProductDetails;
