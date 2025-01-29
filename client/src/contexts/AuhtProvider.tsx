import { createContext, useState } from "react";
import type { Children } from "../types/themeContext";

export const AuthContext = createContext<AuthProps | null>(null);

interface AuthProps {
  auth: boolean;
  setAuth: (value: boolean) => void;
}

export default function AuthProvider({ children }: Children) {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
