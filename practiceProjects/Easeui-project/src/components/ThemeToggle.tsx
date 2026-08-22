import React from "react";
import { useThemeContext } from "../theme/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light/dark theme"
      className="p-2 rounded focus-visible:outline-none focus-visible:ring-2"
    >
      {mode === "dark" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
};
export default ThemeToggle;
