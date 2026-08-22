import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/features/ThemeSlice";
import type { RootState } from "@/store/Store";

interface ThemeContextProps {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: "light",
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  // Apply class and data-theme attribute on change
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme: handleToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
