import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const StyleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleDarkMode, activeColor, setThemeColor, themeColors } = useTheme();

  return (
    <div className={`style-switcher ${isOpen ? 'open' : ''}`}>
      <div
        className="style-switcher-toggler"
        onClick={() => setIsOpen(!isOpen)}
        title="Theme Colors"
      >
        <i className="fas fa-cog fa-spin"></i>
      </div>

      <div
        className="day-night-btn"
        onClick={toggleDarkMode}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
      </div>

      <h4>Theme Colors</h4>
      <div className="colors">
        {themeColors.map((col) => (
          <span
            key={col.id}
            className={`${col.id} ${activeColor === col.hex ? 'active' : ''}`}
            onClick={() => setThemeColor(col.hex)}
            title={col.name}
          ></span>
        ))}
      </div>
    </div>
  );
};
