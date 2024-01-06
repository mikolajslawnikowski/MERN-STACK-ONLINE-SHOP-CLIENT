import { useProductsContext } from "../hooks/useProductsContext";

// date fns
import { format } from "date-fns";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext();

  const handleClick = async () => {
    // if (!user) {
    //   return;
    // }
    const response = await fetch("/api/products/" + product._id, {
      method: "DELETE",
      // headers: {
      //   Authorization: "Bearer ${user.token}",
      // },
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
      <p>{format(new Date(product.createdAt), "dd-LL-yyyy")}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default ProductDetails;
