import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedTheme = localStorage.getItem('sociogram-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const lightColors = {
    primary: '#4285f4',
    secondary: '#34a853',
    accent: '#fbbc05',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#202124',
    textSecondary: '#5f6368',
  };

  const darkColors = {
    primary: '#4285f4',
    secondary: '#34a853',
    accent: '#fbbc05',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#e8eaed',
    textSecondary: '#9aa0a6',
  };

  const theme = {
    mode,
    colors: mode === 'light' ? lightColors : darkColors,
  };

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  const setTheme = (newMode) => {
    setMode(newMode);
  };

  useEffect(() => {
    localStorage.setItem('sociogram-theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const value = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
