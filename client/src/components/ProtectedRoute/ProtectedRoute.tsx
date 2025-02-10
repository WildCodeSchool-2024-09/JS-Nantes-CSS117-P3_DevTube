import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuhtProvider";
import type { Children } from "../../types/themeContext";

export default function ProtectedRoute({ children }: Children) {
  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, []);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return auth && children;
}
