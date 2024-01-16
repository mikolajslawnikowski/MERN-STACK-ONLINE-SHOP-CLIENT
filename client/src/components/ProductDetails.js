import { useProductsContext } from "../hooks/useProductsContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import { format } from "date-fns";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();

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
    <Link to={`/${product._id}`}>
      <div className="product-details">
        <h4>{product.name}</h4>
        <p>
          <strong>ID: </strong>
          {product._id}
        </p>
        <p>
          <strong>Rating: </strong>
          {product.rating}
        </p>
        <img src={product.photo} alt={product.name} />
        <p>
          <strong>Gender: </strong>
          {product.gender}
        </p>
        <p>
          <strong>Category: </strong>
          {product.category}
        </p>
        <p>
          <strong>Description: </strong>
          {product.shortDescription}
        </p>
        <p>
          <strong>Price: </strong>
          {product.price}
        </p>
        <p>
          <strong>Quantity: </strong>
          {product.quantity}{" "}
        </p>
        <p>{format(new Date(product.createdAt), "dd-LL-yyyy")}</p>
        {user && user.admin && (
          <span className="material-symbols-outlined" onClick={handleClick}>
            DELETE
          </span>
        )}
      </div>{" "}
    </Link>
  );
};

export default ProductDetails;
