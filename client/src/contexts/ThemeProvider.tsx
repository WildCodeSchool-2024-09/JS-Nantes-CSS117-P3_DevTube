import { createContext, useState } from "react";
import type { Children, ThemeProps } from "../types/themeContext";

export const ThemeContext = createContext<ThemeProps | null>(null);

export default function ThemeProvider({ children }: Children) {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
