import { createContext, useReducer } from "react";

export const OpinionsContext = createContext();

export const OpinionsReducer = (state, action) => {
  switch (action.type) {
    case "SET_OPINIONS":
      return {
        opinions: action.payload,
      };
    case "CREATE_OPINION":
      return {
        opinions: [action.payload, ...state.opinions],
      };
    case "DELETE_OPINION":
      return {
        opinions: state.opinions.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const OpinionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OpinionsReducer, {
    opinions: null,
  });

  return (
    <OpinionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OpinionsContext.Provider>
  );
};
