import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('weather-theme');
    if (storedTheme) return storedTheme;
    
    // Auto-detect based on time
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 19) ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('weather-theme', theme);
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
};