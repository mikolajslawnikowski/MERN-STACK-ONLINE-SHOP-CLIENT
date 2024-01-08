import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, surname, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, surname, email, password }),
    });

    const json = await response.json();

    // if (!response.ok) {
    //   setIsLoading(false);
    //   setError(json.error);
    // }
    // if (response.ok) {
    //   // save the user to local storage
    //   localStorage.setItem("user", JSON.stringify(json));

    //   // update the auth context
    //   dispatch({ type: "LOGIN", payload: json });

    //   setIsLoading(false);
    // }

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      const user = JSON.parse(localStorage.getItem("user"));

      const infoUserResponse = await fetch("/api/user/info", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const infoUserJSON = await infoUserResponse.json();

      if (!infoUserResponse.ok) {
        setIsLoading(false);
        setError(infoUserJSON.error);
      }

      if (infoUserResponse.ok) {
        // update the auth context
        dispatch({ type: "LOGIN", payload: infoUserJSON });
        setIsLoading(false);
      }
    }
  };

  return { error, isLoading, signup };
};
