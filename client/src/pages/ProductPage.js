import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OpinionForm from "../components/OpinionForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import { format } from "date-fns";
import Stars from "../components/Stars";
import { useOpinionsContext } from "../hooks/useOpinionsContext";

function calculateAverageRating(opinions) {
  if (!opinions) {
    return 0;
  }

  const total = opinions.reduce((acc, opinion) => acc + opinion.ratingValue, 0);
  return Math.round((total / opinions.length) * 2) / 2;
}

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuthContext();
  const { opinions, dispatch } = useOpinionsContext();
  const sortedOpinions = opinions
    ? opinions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();

      if (response.ok) {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchOpinions = async () => {
      const response = await fetch(`/api/opinions/${id}`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_OPINIONS", payload: json });
      }
    };

    fetchOpinions();
  }, [id, dispatch]);

  const handleClick = async (id) => {
    const response = await fetch("/api/opinions/" + id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      dispatch({ type: "DELETE_OPINION", payload: json });
    }
  };

  const handleAddToCart = () => {
    addToCart(product._id, quantity);
    setQuantity(1);
  };

  return (
    <div>
      {product ? (
        <>
          <p>Name: {product.name}</p>
          <p>ID: {product._id}</p>
          <p>
            Average Rating: <Stars rating={calculateAverageRating(opinions)} />
          </p>
          <p>Rating Siema: {product.rating}</p>
          <img src={product.photo} alt={product.name} />
          <p>Gender: {product.gender}</p>
          <p>Category: {product.category}</p>
          <p>Description: {product.longDescription}</p>
          <p>Price: {product.price}</p>
          <p>quantity: {product.quantity}</p>
          <p>Date added: {format(new Date(product.createdAt), "dd-LL-yyyy")}</p>
          <p>Delivery by post is possible</p>
          {product.shipping2 ? (
            <p>Delivery by courier is possible</p>
          ) : (
            <p>Delivery by courier is not possible</p>
          )}{" "}
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          >
            {[...Array(product.quantity).keys()].map((value) => (
              <option key={value + 1} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>
          <button onClick={handleAddToCart}>ADD TO CART</button>
          {user ? (
            <OpinionForm id={product._id} />
          ) : (
            <p>Log in to leave an opinion.</p>
          )}
          {opinions && opinions.length === 0 ? (
            <p>This product has no opinions yet</p>
          ) : (
            sortedOpinions.map((opinion) => (
              <div key={opinion._id}>
                <p>
                  Author: {opinion.authorName} {opinion.authorSurname}
                </p>
                <p>
                  Rating: <Stars rating={opinion.ratingValue} />
                </p>
                <p>Opinion: {opinion.opinionText}</p>

                <p>Date: {format(new Date(opinion.createdAt), "dd/MM/yyyy")}</p>
                {user && user.admin && (
                  <span
                    className="material-symbols-outlined"
                    onClick={() => handleClick(opinion._id)}
                  >
                    DELETE
                  </span>
                )}
              </div>
            ))
          )}
        </>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductPage;
