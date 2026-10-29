import React from 'react';

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle-btn"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        /* Exact sun icon from screenshot: center circle surrounded by 8 radial dots */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="sun-icon-svg"
        >
          {/* Center hollow circle */}
          <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          {/* 8 radial dots */}
          <circle cx="12" cy="3.5" r="1.1" fill="currentColor" />
          <circle cx="12" cy="20.5" r="1.1" fill="currentColor" />
          <circle cx="3.5" cy="12" r="1.1" fill="currentColor" />
          <circle cx="20.5" cy="12" r="1.1" fill="currentColor" />
          <circle cx="6" cy="6" r="1.1" fill="currentColor" />
          <circle cx="18" cy="6" r="1.1" fill="currentColor" />
          <circle cx="6" cy="18" r="1.1" fill="currentColor" />
          <circle cx="18" cy="18" r="1.1" fill="currentColor" />
        </svg>
      ) : (
        /* Moon icon for light mode */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="moon-icon-svg"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
