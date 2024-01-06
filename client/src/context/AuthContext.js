import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return { user: action.payload, isAdmin: action.payload.admin };
//     case "LOGOUT":
//       return { user: null, isAdmin: false };
//     default:
//       return state;
//   }
// };

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  // const [state, dispatch] = useReducer(authReducer, {
  //   user: null,
  //   isAdmin: false,
  // });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
