import { OpinionsContext } from "../context/OpinionsContext";
import { useContext } from "react";

export const useOpinionsContext = () => {
  const context = useContext(OpinionsContext);

  if (!context) {
    throw new Error(
      "useOpinionsContext must be used within a OpinionsContextProvider"
    );
  }

  return context;
};
