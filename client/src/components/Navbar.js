import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-green-50">
      <div className="container">
        <Link to="/">
          <h1>Online Store</h1>
        </Link>
        <nav>
          {user && <Link to="/profile">Profile</Link>}
          <Link to="/cart">Cart</Link>
          {user && (
            <div>
              <span>Hello {user.name}</span>

              {user.admin && <Link to="/dashboard">Dashboard</Link>}
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
