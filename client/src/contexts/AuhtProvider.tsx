import { createContext, useState } from "react";
import type { AuthProps } from "../types/AuthContext";
import type { Children } from "../types/themeContext";

export const AuthContext = createContext<AuthProps | null>(null);

export default function AuthProvider({ children }: Children) {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
