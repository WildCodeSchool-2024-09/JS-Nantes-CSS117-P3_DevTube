import { createContext, useEffect, useState } from "react";
import type { User } from "../../../server/src/modules/user/user";
import type { AuthProps } from "../types/AuthContext";
import type { Children } from "../types/themeContext";

export const AuthContext = createContext<AuthProps | null>(null);

export default function AuthProvider({ children }: Children) {
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const currentToken = localStorage.getItem("token");

      if (currentToken) {
        fetch(`${import.meta.env.VITE_API_URL}/api/verify-token`, {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        })
          .then((response) => {
            if (!response.ok) throw new Error("Invalid token.");
            setAuth(true); // return a boolean true or false 200
            return response.json();
          })
          .then((user) => {
            setUser(user);
          });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const login = (token: string, user: User) => {
    setAuth(true);
    setUser(user);
    if (user.is_admin) setAdmin(true);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuth(false);
    setUser(null);
    setAdmin(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, logout, user, admin, setAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
