import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuhtProvider";
import type { Children } from "../../types/themeContext";

export default function ProtectedRoute({ children }: Children) {
  useEffect(() => {
    if (!auth?.auth) {
      navigate("/");
    }
  }, []);

  const auth = useContext(AuthContext);

  console.warn("C'est quoi auth ??", auth);

  const navigate = useNavigate();

  if (!auth?.auth) return null;

  return auth.auth && children;
}
