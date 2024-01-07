import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <div>{product ? <h1>{product.name}</h1> : <p>Loading product...</p>}</div>
    // <div>
    //   <h2>Product Page</h2>
    // </div>
  );
};

export default ProductPage;
