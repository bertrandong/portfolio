"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { themes, ThemeId, Theme } from "./themes";

interface ThemeContextValue {
  themeId: ThemeId;
  theme: Theme;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeId: "midnight",
  theme: themes[0],
  setTheme: () => {},
});

function applyThemeVars(id: ThemeId) {
  const theme = themes.find((t) => t.id === id) ?? themes[0];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, val]) => root.style.setProperty(key, val));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>("midnight");

  useEffect(() => {
    const saved = (localStorage.getItem("portfolio-theme") ?? "midnight") as ThemeId;
    setThemeId(saved);
    applyThemeVars(saved);
  }, []);

  const setTheme = (id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem("portfolio-theme", id);
    applyThemeVars(id);
  };

  const theme = themes.find((t) => t.id === themeId) ?? themes[0];

  return (
    <ThemeContext.Provider value={{ themeId, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
