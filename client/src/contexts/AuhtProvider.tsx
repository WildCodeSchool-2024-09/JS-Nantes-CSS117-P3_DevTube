import { createContext, useEffect, useState } from "react";
import type { AuthProps } from "../types/AuthContext";
import type { Children } from "../types/themeContext";

export const AuthContext = createContext<AuthProps | null>(null);

export default function AuthProvider({ children }: Children) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
      fetch(`${import.meta.env.VITE_API_URL}/api/verify-token`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      }).then((response) => {
        setAuth(response.ok); // return a boolean true or false 200
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
