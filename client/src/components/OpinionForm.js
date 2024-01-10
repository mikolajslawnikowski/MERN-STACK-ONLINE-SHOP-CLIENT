import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useOpinionsContext } from "../hooks/useOpinionsContext";

const OpinionForm = ({ id }) => {
  const { user } = useAuthContext();
  const [opinionText, setOpinionText] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  // TEST CONTEXT
  const { dispatch } = useOpinionsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const opinion = {
      itemID: id,
      authorName: user.name,
      authorSurname: user.surname,
      opinionText,
    };

    const response = await fetch("/api/opinions", {
      method: "POST",
      body: JSON.stringify(opinion),
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
      setOpinionText("");
      setError(null);
      setEmptyFields([]);
      console.log("New Opinion added successfully!", json);
      // TEST CONTEXT
      dispatch({ type: "CREATE_OPINION", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Add opinion:</label>
      <textarea
        onChange={(e) => setOpinionText(e.target.value)}
        value={opinionText}
        className={emptyFields.includes("opinionText") ? "error" : ""}
      />
      <button type="submit">Add opinion</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default OpinionForm;
