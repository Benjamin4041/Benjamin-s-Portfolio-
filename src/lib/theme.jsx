import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "benjamin_portfolio_theme";

function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
