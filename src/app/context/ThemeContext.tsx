"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = 'light' | 'dark' | 'color';

// Keep track of recently used colors to avoid repetition
const recentColors = new Set<number>();
const MAX_RECENT_COLORS = 10; // How many colors to remember

const generateRandomColor = () => {
  let hue: number;
  // Keep generating until we find a hue we haven't used recently
  do {
    hue = Math.floor(Math.random() * 360);
  } while (recentColors.has(hue));

  // Add the new hue to recent colors
  recentColors.add(hue);
  // Remove oldest color if we've reached our limit
  if (recentColors.size > MAX_RECENT_COLORS) {
    recentColors.delete(Array.from(recentColors)[0]);
  }

  return `hsl(${hue}, 70%, 85%)`; // Light background
};

const generateRandomDarkColor = () => {
  // Use the most recently added hue from recentColors for the text color
  // This ensures the text color matches the background theme
  const hue = Array.from(recentColors).pop() || Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 25%)`; // Dark text color that contrasts with the light background
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [randomBackground, setRandomBackground] = useState<string>(generateRandomColor());
  const [randomText, setRandomText] = useState<string>(generateRandomDarkColor());

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    if (newTheme === 'color') {
      setRandomBackground(generateRandomColor());
      setRandomText(generateRandomDarkColor());
    }
  };

  useEffect(() => {
    try {
      // Get initial theme from localStorage or system preference
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme && ["light", "dark", "color"].includes(savedTheme)) {
        setTheme(savedTheme);
        if (savedTheme === "color") {
          const savedBackground = localStorage.getItem("randomBackground");
          const savedText = localStorage.getItem("randomText");
          if (savedBackground && savedText) {
            setRandomBackground(savedBackground);
            setRandomText(savedText);
          }
        }
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      // Save theme to localStorage
      localStorage.setItem("theme", theme);
      localStorage.setItem("randomBackground", randomBackground);
      localStorage.setItem("randomText", randomText);
      
      // Update document class and CSS variables
      document.documentElement.classList.remove("light", "dark", "color");
      document.documentElement.classList.add(theme);

      if (theme === "color") {
        document.documentElement.style.setProperty("--random-background", randomBackground);
        document.documentElement.style.setProperty("--random-text", randomText);
      } else {
        document.documentElement.style.removeProperty("--random-background");
        document.documentElement.style.removeProperty("--random-text");
      }
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  }, [theme, randomBackground, randomText]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
