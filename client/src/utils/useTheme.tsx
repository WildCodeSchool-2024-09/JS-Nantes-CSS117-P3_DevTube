import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("This context cannot be null");
  }
  return context;
}

export default useTheme;
