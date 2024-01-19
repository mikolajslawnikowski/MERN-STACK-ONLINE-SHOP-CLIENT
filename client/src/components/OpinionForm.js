import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useOpinionsContext } from "../hooks/useOpinionsContext";
import { FaStar } from "react-icons/fa";

const OpinionForm = ({ id }) => {
  const { user } = useAuthContext();
  const [opinionText, setOpinionText] = useState("");
  const [ratingValue, setRatingValue] = useState(1);
  const [currentRating, setCurrentRating] = useState(1);
  const [ratingHover, setRatingHover] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useOpinionsContext();

  const handleSubmit = async (e) => {
    const opinion = {
      itemID: id,
      authorName: user.name,
      authorSurname: user.surname,
      opinionText,
      ratingValue,
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
      setRatingValue(1);
      setCurrentRating(1);
      setError(null);
      setEmptyFields([]);
      console.log("New Opinion added successfully!", json);
      dispatch({ type: "CREATE_OPINION", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Add rating:</label>
      <div className="stars">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => {
                  setRatingValue(ratingValue);
                  setCurrentRating(ratingValue);
                }}
              />
              {/* <FaStar
                size={25}
                color={ratingValue <= currentRating ? "#ffc107" : "#e4e5e9"}
                className="star"
              /> */}
              <FaStar
                size={20}
                color={
                  ratingValue <= (ratingHover || currentRating)
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                className="star"
                onMouseEnter={() => setRatingHover(ratingValue)}
                onMouseLeave={() => setRatingHover(null)}
              />
            </label>
          );
        })}
      </div>
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
