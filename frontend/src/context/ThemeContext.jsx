import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themeColors = [
  { id: 'color-1', name: 'Crimson Red', hex: '#ec1839' },
  { id: 'color-2', name: 'Vibrant Orange', hex: '#fa5b0f' },
  { id: 'color-3', name: 'Emerald Green', hex: '#37b182' },
  { id: 'color-4', name: 'Electric Blue', hex: '#1854b4' },
  { id: 'color-5', name: 'Magenta Pink', hex: '#f021b2' },
];

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const [activeColor, setActiveColor] = useState(() => {
    return localStorage.getItem('portfolio_color') || '#ec1839';
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.style.setProperty('--skin-color', activeColor);
    localStorage.setItem('portfolio_color', activeColor);
  }, [activeColor]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const setThemeColor = (hex) => {
    setActiveColor(hex);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleDarkMode,
        activeColor,
        setThemeColor,
        themeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
