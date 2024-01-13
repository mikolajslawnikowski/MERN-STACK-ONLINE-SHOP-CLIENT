import { Link } from "react-router-dom";

const GenderButtons = () => {
  return (
    <div>
      <button>
        <Link to="/men">MEN</Link>
      </button>
      <button>
        <Link to="/women">WOMEN</Link>
      </button>
    </div>
  );
};

export default GenderButtons;
