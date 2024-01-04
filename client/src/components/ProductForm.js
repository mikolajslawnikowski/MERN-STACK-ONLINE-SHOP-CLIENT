import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

const ProductForm = () => {
  const { dispatch } = useProductsContext();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { name, photo, price, description, quantity };

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setPhoto("");
      setPrice("");
      setDescription("");
      setQuantity("");
      setError(null);
      setEmptyFields([]);
      console.log("New Product added successfully!", json);
      dispatch({ type: "CREATE_PRODUCT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Product</h3>

      <label>Product name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />

      <label>Photo link:</label>
      <input
        type="text"
        onChange={(e) => setPhoto(e.target.value)}
        value={photo}
        className={emptyFields.includes("photo") ? "error" : ""}
      />

      <label>Product price:</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields.includes("price") ? "error" : ""}
      />

      <label>Product description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <label>Product quantity:</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        className={emptyFields.includes("quantity") ? "error" : ""}
      />

      <button type="submit">Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
