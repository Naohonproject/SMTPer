import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const themeContextData = { theme, setTheme };
  return <ThemeContext.Provider value={themeContextData}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
