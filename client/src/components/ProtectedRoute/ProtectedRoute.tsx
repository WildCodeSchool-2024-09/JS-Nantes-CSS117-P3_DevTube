import { type ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuhtProvider";

export default function ProtectedRoute(children: ReactNode) {
  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, []);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return auth && { children };
}
