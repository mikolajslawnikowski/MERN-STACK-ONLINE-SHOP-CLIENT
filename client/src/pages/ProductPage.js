import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OpinionForm from "../components/OpinionForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";
// TEST CONTEXT
import { useOpinionsContext } from "../hooks/useOpinionsContext";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuthContext();
  // const [opinions, setOpinions] = useState(null);
  // TEST CONTEXT
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

  // useEffect(() => {
  //   const fetchOpinions = async () => {
  //     const response = await fetch("/api/opinions/");
  //     const json = await response.json();

  //     if (response.ok) {
  //       // TEST CONTEXT
  //       // setOpinions(json);
  //       dispatch({ type: "SET_OPINIONS", payload: json });
  //     }
  //   };

  //   fetchOpinions();
  // }, [dispatch]);

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

  return (
    <div>
      {product ? (
        <>
          <p>Name: {product.name}</p>
          <p>ID: {product._id}</p>
          <img src={product.photo} alt={product.name} />
          <p>Gender: {product.gender}</p>
          <p>Category: {product.category}</p>
          <p>Description: {product.longDescription}</p>
          <p>Price: {product.price}</p>
          <p>quantity: {product.quantity}</p>
          <p>Date added: {format(new Date(product.createdAt), "dd-LL-yyyy")}</p>
          {user ? (
            <OpinionForm id={product._id} />
          ) : (
            <p>Log in to leave an opinion.</p>
          )}
          {/* {opinions &&
            sortedOpinions.map((opinion) => (
              <div key={opinion._id}>
                <p>
                  Author: {opinion.authorName} {opinion.authorSurname}
                </p>
                <p>Opinion: {opinion.opinionText}</p>
                <p>Date: {format(new Date(opinion.createdAt), "dd/MM/yyyy")}</p>
              </div>
            ))} */}
          {opinions && opinions.length === 0 ? (
            <p>This product has no opinions yet</p>
          ) : (
            sortedOpinions.map((opinion) => (
              <div key={opinion._id}>
                <p>
                  Author: {opinion.authorName} {opinion.authorSurname}
                </p>
                <p>Opinion: {opinion.opinionText}</p>
                <p>Date: {format(new Date(opinion.createdAt), "dd/MM/yyyy")}</p>
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
