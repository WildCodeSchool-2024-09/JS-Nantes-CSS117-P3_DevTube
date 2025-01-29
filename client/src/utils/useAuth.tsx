import { useContext } from "react";
import { AuthContext } from "../contexts/AuhtProvider";

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("This context cannot be null");
  }
  return context;
}

export default useAuth;
