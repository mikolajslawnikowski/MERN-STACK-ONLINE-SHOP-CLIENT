import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

const ProductForm = () => {
  const { dispatch } = useProductsContext();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      photo,
      price,
      gender,
      category,
      shortDescription,
      longDescription,
      quantity,
    };

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
      setGender("");
      setCategory("");
      setShortDescription("");
      setLongDescription("");
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

      <label>Product short description:</label>
      <input
        type="text"
        onChange={(e) => setShortDescription(e.target.value)}
        value={shortDescription}
        className={emptyFields.includes("shortDescription") ? "error" : ""}
      />

      <label>Product long description:</label>
      <input
        type="text"
        onChange={(e) => setLongDescription(e.target.value)}
        value={longDescription}
        className={emptyFields.includes("longDescription") ? "error" : ""}
      />

      <label>Product quantity:</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        className={emptyFields.includes("quantity") ? "error" : ""}
      />

      <label>Product gender:</label>
      <select
        onChange={(e) => setGender(e.target.value)}
        value={gender}
        className={emptyFields.includes("gender") ? "error" : ""}
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label>Product category:</label>
      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields.includes("category") ? "error" : ""}
      >
        <option value="">Select category:</option>
        <option value="hats">Hats</option>
        <option value="hoodies">Hoodies</option>
        <option value="shirts">Shirts</option>
        <option value="pants">Pants</option>
        <option value="shoes">Shoes</option>
      </select>

      <button type="submit">Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
