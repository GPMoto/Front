import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  setDark: (v: boolean) => void;
}

const THEME_KEY = "@gpmoto:isDarkTheme";

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  useEffect(() => {
    loadStoredTheme();
  }, []);

  const loadStoredTheme = async () => {
    const stored = await AsyncStorage.getItem(THEME_KEY);
    if (stored !== null) {
      setIsDarkTheme(stored === "true");
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme((value) => {
      const next = !value;
      AsyncStorage.setItem(THEME_KEY, next ? "true" : "false");
      return next;
    });
  };

  const setDark = async (value: boolean) => {
    setIsDarkTheme(value);
    await AsyncStorage.setItem(THEME_KEY, value ? "true" : "false");
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
