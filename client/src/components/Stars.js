import { FaStar } from "react-icons/fa";

const Stars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar key={i} size={20} color={i <= rating ? "#ffc107" : "#e4e5e9"} />
    );
  }
  return <div>{stars}</div>;
};

export default Stars;
