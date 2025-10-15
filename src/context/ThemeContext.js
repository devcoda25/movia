import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { colors as colorPalette } from '../constants/colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme(); // 'dark' or 'light'
  const [theme, setTheme] = useState(systemColorScheme || 'dark'); // Default to dark

  useEffect(() => {
    setTheme(systemColorScheme || 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const isDarkTheme = theme === 'dark';

  const currentColors = {
    background: isDarkTheme ? colorPalette['background-dark'] : colorPalette['background-light'],
    surface: isDarkTheme ? colorPalette['surface-dark'] : colorPalette['surface-light'],
    textPrimary: isDarkTheme ? colorPalette['text-dark-primary'] : colorPalette['text-light-primary'],
    textSecondary: isDarkTheme ? colorPalette['text-dark-secondary'] : colorPalette['text-light-secondary'],
    primary: colorPalette.primary,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme, colors: currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
