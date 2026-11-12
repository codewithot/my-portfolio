import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { CelestialController } from './CelestialController';
import './Navbar.css';

export function Navbar({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
  customHours,
  setCustomHours,
  isLiveTime,
  setIsLiveTime,
  weather,
  isLiveWeather,
  setIsLiveWeather,
  setCustomWeather,
  onRefreshWeather,
}) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'works', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'writings', label: 'Writings' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        {/* Brand Logo "VI" */}
        <div className="nav-col nav-left">
          <a
            href="#"
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('home');
            }}
          >
            VI
          </a>
        </div>

        {/* Center Floating Capsule Pill */}
        <nav className="nav-col nav-center">
          <div className="nav-pill-track">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-pill-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right Column: Celestial controller + Theme toggle */}
        <div className="nav-col nav-right">
          <CelestialController
            theme={theme}
            customHours={customHours}
            setCustomHours={setCustomHours}
            isLiveTime={isLiveTime}
            setIsLiveTime={setIsLiveTime}
            weather={weather}
            isLiveWeather={isLiveWeather}
            setIsLiveWeather={setIsLiveWeather}
            setCustomWeather={setCustomWeather}
            onRefreshWeather={onRefreshWeather}
          />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </header>
  );
}
