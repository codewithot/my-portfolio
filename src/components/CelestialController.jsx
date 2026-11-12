import React, { useState, useEffect, useRef } from 'react';
import { getCelestialState, formatTime } from '../utils/celestial';
import './CelestialController.css';

export function CelestialController({
  theme,
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
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Live real-world browser clock tracker
  const [liveHours, setLiveHours] = useState(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLiveHours(now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // If in light mode, the celestial lighting is inactive
  if (theme !== 'dark') {
    return null;
  }

  const activeHours = isLiveTime ? liveHours : customHours;
  const celestial = getCelestialState(activeHours);
  const timeDisplay = formatTime(activeHours);

  const timePresets = [
    { label: 'Dawn', hours: 6.2, icon: '🌅' },
    { label: 'Midday', hours: 12.0, icon: '☀️' },
    { label: 'Sunset', hours: 18.0, icon: '🌇' },
    { label: 'Night Moon', hours: 22.5, icon: '🌕' },
  ];

  const weatherPresets = [
    { type: 'clear', label: 'Clear Sky', icon: '☀️' },
    { type: 'cloudy', label: 'Cloudy', icon: '⛅' },
    { type: 'rain', label: 'Rain', icon: '🌧️' },
    { type: 'thunderstorm', label: 'Storm', icon: '⛈️' },
  ];

  const weatherIcon = weather?.icon || (celestial.type === 'sun' ? '☀️' : '🌕');

  return (
    <div className="celestial-controller-wrapper" ref={popoverRef}>
      {/* Trigger Pill Button in Navbar */}
      <button
        className={`celestial-pill-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle celestial lighting & weather simulation"
        title="Celestial lighting & weather controls"
      >
        <span className="celestial-icon-badge">{weatherIcon}</span>
        <span className="celestial-pill-label">
          {isLiveTime && <span className="live-dot" />}
          <span>{timeDisplay}</span>
          {weather?.temperature !== undefined && (
            <span className="pill-temp-tag">· {weather.temperature}°C</span>
          )}
        </span>
      </button>

      {/* Popover Controls Modal */}
      {isOpen && (
        <div className="celestial-popover">
          <div className="celestial-popover-header">
            <div className="celestial-popover-title-row">
              <span className="popover-title">Atmosphere & Weather</span>
              <button
                className="popover-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="popover-desc">
              Synchronized with your browser time & local weather.
            </p>
          </div>

          <div className="celestial-popover-body">
            {/* Live Weather & Location Status Card */}
            <div className="celestial-status-banner">
              <div className="status-current-badge">
                <span className="status-icon">{weather?.icon || '☀️'}</span>
                <div>
                  <div className="status-title">
                    {weather?.label || celestial.label}
                  </div>
                  <div className="status-location-sub">
                    📍 {weather?.city || 'Local Area'} · {weather?.temperature ?? 24}°C
                  </div>
                </div>
              </div>
              <div className="status-meta-right">
                <span className="status-time-val">{timeDisplay}</span>
                {isLiveWeather && (
                  <button
                    className="weather-refresh-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onRefreshWeather) onRefreshWeather();
                    }}
                    title="Refresh local weather"
                  >
                    ↻ Sync
                  </button>
                )}
              </div>
            </div>

            {/* Weather Mode: Live vs Override */}
            <div className="presets-group">
              <div className="section-header-row">
                <span className="presets-label">Weather Condition</span>
                <button
                  className={`pill-auto-toggle ${isLiveWeather ? 'active' : ''}`}
                  onClick={() => setIsLiveWeather(true)}
                >
                  {isLiveWeather ? '● Live Location' : 'Use Live'}
                </button>
              </div>
              <div className="preset-chips">
                {weatherPresets.map((wp) => {
                  const isSelected = !isLiveWeather && weather?.weatherType === wp.type;
                  return (
                    <button
                      key={wp.type}
                      className={`preset-chip-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setIsLiveWeather(false);
                        setCustomWeather(wp.type);
                      }}
                    >
                      <span>{wp.icon}</span>
                      <span>{wp.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Mode: Live Browser vs Custom Scrub */}
            <div className="presets-group">
              <div className="section-header-row">
                <span className="presets-label">Browser Time</span>
                <button
                  className={`pill-auto-toggle ${isLiveTime ? 'active' : ''}`}
                  onClick={() => setIsLiveTime(true)}
                >
                  {isLiveTime ? '● Live Clock' : 'Use Live'}
                </button>
              </div>

              {/* 24-Hour Slider */}
              <input
                type="range"
                min="0"
                max="24"
                step="0.1"
                value={activeHours}
                onChange={(e) => {
                  setIsLiveTime(false);
                  setCustomHours(parseFloat(e.target.value));
                }}
                className="celestial-range-slider"
                aria-label="Time of day slider"
              />
              <div className="slider-ticks">
                <span>12 AM</span>
                <span>6 AM</span>
                <span>12 PM</span>
                <span>6 PM</span>
                <span>12 AM</span>
              </div>

              {/* Time Presets */}
              <div className="preset-chips" style={{ marginTop: '8px' }}>
                {timePresets.map((tp) => (
                  <button
                    key={tp.label}
                    className="preset-chip-btn"
                    onClick={() => {
                      setIsLiveTime(false);
                      setCustomHours(tp.hours);
                    }}
                  >
                    <span>{tp.icon}</span>
                    <span>{tp.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset All to Live Button */}
            {(!isLiveTime || !isLiveWeather) && (
              <button
                className="reset-live-btn"
                onClick={() => {
                  setIsLiveTime(true);
                  setIsLiveWeather(true);
                  if (onRefreshWeather) onRefreshWeather();
                }}
              >
                ↺ Reset to Live Browser Time & Weather
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
