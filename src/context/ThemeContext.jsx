import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('sociogram-theme');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    console.log('Theme changed to:', isDark ? 'dark' : 'light');
    localStorage.setItem('sociogram-theme', JSON.stringify(isDark));
    
    // Apply theme to document body with modern styling
    document.body.style.backgroundColor = isDark ? '#0f0f23' : '#fafafa';
    document.body.style.color = isDark ? '#ffffff' : '#262626';
    document.body.style.backgroundImage = isDark 
      ? 'radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)'
      : 'radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)';
    
    // Apply theme to document
    if (isDark) {
      document.documentElement.style.setProperty('--bg-primary', '#0f0f23');
      document.documentElement.style.setProperty('--bg-secondary', '#1a1a2e');
      document.documentElement.style.setProperty('--bg-tertiary', '#16213e');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#b3b3b3');
      document.documentElement.style.setProperty('--border-color', '#2d2d4a');
      document.documentElement.style.setProperty('--accent-color', '#667eea');
      document.documentElement.style.setProperty('--accent-hover', '#5a67d8');
      document.documentElement.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
      document.documentElement.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)');
      document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.05)');
      document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--shadow-soft', '0 8px 32px rgba(0, 0, 0, 0.3)');
      document.documentElement.style.setProperty('--shadow-medium', '0 16px 64px rgba(0, 0, 0, 0.4)');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#fafafa');
      document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
      document.documentElement.style.setProperty('--bg-tertiary', '#f5f5f5');
      document.documentElement.style.setProperty('--text-primary', '#262626');
      document.documentElement.style.setProperty('--text-secondary', '#737373');
      document.documentElement.style.setProperty('--border-color', '#e1e1e1');
      document.documentElement.style.setProperty('--accent-color', '#667eea');
      document.documentElement.style.setProperty('--accent-hover', '#5a67d8');
      document.documentElement.style.setProperty('--accent-hover', '#1877f2');
      document.documentElement.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
      document.documentElement.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)');
      document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.25)');
      document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.18)');
      document.documentElement.style.setProperty('--shadow-soft', '0 8px 32px rgba(31, 38, 135, 0.15)');
      document.documentElement.style.setProperty('--shadow-medium', '0 16px 64px rgba(31, 38, 135, 0.2)');
    }
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggle theme called, current isDark:', isDark);
    setIsDark(prev => !prev);
  };

  const value = {
    isDark,
    toggleTheme,
    theme: {
      colors: {
        primary: '#667eea',
        primaryHover: '#5a67d8',
        secondary: '#764ba2',
        accent: '#f093fb',
        success: '#48bb78',
        error: '#f56565',
        warning: '#ed8936',
        like: '#ff3040',
        text: {
          primary: isDark ? '#ffffff' : '#262626',
          secondary: isDark ? '#b3b3b3' : '#737373',
          muted: isDark ? '#8a8a8a' : '#999999'
        },
        background: {
          primary: isDark ? '#0f0f23' : '#fafafa',
          secondary: isDark ? '#1a1a2e' : '#ffffff',
          tertiary: isDark ? '#16213e' : '#f5f5f5'
        },
        border: isDark ? '#2d2d4a' : '#e1e1e1',
        glass: {
          background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
          border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'
        },
        gradients: {
          primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          accent: 'linear-gradient(135deg, #3797f0 0%, #1877f2 100%)'
        }
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem'
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px'
      },
      shadows: {
        soft: isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(31, 38, 135, 0.15)',
        medium: isDark ? '0 16px 64px rgba(0, 0, 0, 0.4)' : '0 16px 64px rgba(31, 38, 135, 0.2)',
        glow: '0 0 20px rgba(55, 151, 240, 0.3)'
      }
    }
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
