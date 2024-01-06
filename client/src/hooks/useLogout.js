import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    // redirect to home page
    navigate("/");
  };

  return { logout };
};
