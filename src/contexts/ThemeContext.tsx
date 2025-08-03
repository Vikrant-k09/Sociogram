import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode, AppTheme, ThemeColors } from '../types';

interface ThemeContextType {
  theme: AppTheme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const lightColors: ThemeColors = {
  primary: '#4285f4',
  secondary: '#34a853',
  accent: '#fbbc05',
  background: '#ffffff',
  surface: '#f8f9fa',
  text: '#202124',
  textSecondary: '#5f6368',
};

const darkColors: ThemeColors = {
  primary: '#4285f4',
  secondary: '#34a853',
  accent: '#fbbc05',
  background: '#121212',
  surface: '#1e1e1e',
  text: '#e8eaed',
  textSecondary: '#9aa0a6',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('sociogram-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme as ThemeMode;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const theme: AppTheme = {
    mode,
    colors: mode === 'light' ? lightColors : darkColors,
  };

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  useEffect(() => {
    localStorage.setItem('sociogram-theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const value: ThemeContextType = {
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

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
