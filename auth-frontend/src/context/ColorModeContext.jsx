import { createContext, useContext, useState, useEffect } from "react";
import { checkColorPreferences } from "../utils/color-mode-helper";

const ColorModeContext = createContext();

export function ColorModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(checkColorPreferences());

  useEffect(() => {
    // Function to handle changes to the color preference
    const handleColorPreferenceChange = (e) => {
      setIsDarkMode(e.matches ? "dark" : "light");
    };

    const colorPreferenceMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    // Listen for changes to the prefers-color-scheme media query
    colorPreferenceMediaQuery.addEventListener(
      "change",
      handleColorPreferenceChange
    );

    return () => {
      // Stop listening for changes to the prefers-color-scheme media query
      colorPreferenceMediaQuery.removeEventListener(
        "change",
        handleColorPreferenceChange
      );
    };
  }, []);

  return (
    <ColorModeContext.Provider value={{ isDarkMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

// Custom hook to consume the ColorModeContext
export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}
