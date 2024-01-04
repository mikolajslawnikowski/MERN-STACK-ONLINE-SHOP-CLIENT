import { useProductsContext } from "../hooks/useProductsContext";

// date fns
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext();

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
      <h4>{product.name}</h4>
      <p>
        <strong>Opis: </strong>
        {product.description}
      </p>
      <p>
        <strong>Cena: </strong>
        {product.price}
      </p>
      <p>
        {formatDistanceToNow(new Date(product.createdAt), { addSufix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default ProductDetails;
