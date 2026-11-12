import React, { useState, useEffect, useRef } from 'react';
import { getCelestialState, formatTime } from '../utils/celestial';
import './CelestialController.css';

export function CelestialController({
  theme,
  customHours,
  setCustomHours,
  isLiveTime,
  setIsLiveTime,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Live real-world time tracker
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

  const presets = [
    { label: 'Dawn', hours: 6.2, icon: '🌅' },
    { label: 'Midday', hours: 12.0, icon: '☀️' },
    { label: 'Sunset', hours: 18.0, icon: '🌇' },
    { label: 'Night Moon', hours: 22.5, icon: '🌕' },
  ];

  return (
    <div className="celestial-controller-wrapper" ref={popoverRef}>
      {/* Trigger Pill Button */}
      <button
        className={`celestial-pill-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle celestial lighting simulation options"
        title="Celestial lighting controls"
      >
        <span className="celestial-icon-badge">
          {celestial.type === 'sun' ? (
            <span className="celestial-emoji">☀️</span>
          ) : (
            <span className="celestial-emoji">🌕</span>
          )}
        </span>
        <span className="celestial-pill-label">
          {isLiveTime ? (
            <>
              <span className="live-dot" />
              <span>{timeDisplay}</span>
            </>
          ) : (
            <span>{timeDisplay}</span>
          )}
        </span>
      </button>

      {/* Popover Controls Modal */}
      {isOpen && (
        <div className="celestial-popover">
          <div className="celestial-popover-header">
            <div className="celestial-popover-title-row">
              <span className="popover-title">Celestial Simulation</span>
              <button
                className="popover-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="popover-desc">
              Real-time sun & moon cycle shining over the page.
            </p>
          </div>

          <div className="celestial-popover-body">
            {/* Live vs Custom Toggle */}
            <div className="mode-toggle-row">
              <button
                className={`mode-btn ${isLiveTime ? 'selected' : ''}`}
                onClick={() => setIsLiveTime(true)}
              >
                <span className="mode-dot live" />
                Live Real-Time
              </button>
              <button
                className={`mode-btn ${!isLiveTime ? 'selected' : ''}`}
                onClick={() => {
                  setIsLiveTime(false);
                  if (customHours === null) setCustomHours(liveHours);
                }}
              >
                Custom Time
              </button>
            </div>

            {/* Current Status Banner */}
            <div className="celestial-status-banner">
              <div className="status-current-badge">
                <span className="status-icon">
                  {celestial.type === 'sun' ? '☀️' : '🌕'}
                </span>
                <span className="status-title">{celestial.label}</span>
              </div>
              <span className="status-time-val">{timeDisplay}</span>
            </div>

            {/* Interactive 24-Hour Slider */}
            <div className="slider-control-group">
              <div className="slider-label-row">
                <span className="slider-label">Scrub Time of Day</span>
                <span className="slider-subtext">00:00 — 23:59</span>
              </div>
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
            </div>

            {/* Quick Presets */}
            <div className="presets-group">
              <span className="presets-label">Quick Preview</span>
              <div className="preset-chips">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    className="preset-chip-btn"
                    onClick={() => {
                      setIsLiveTime(false);
                      setCustomHours(preset.hours);
                    }}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset to Live Time */}
            {!isLiveTime && (
              <button
                className="reset-live-btn"
                onClick={() => setIsLiveTime(true)}
              >
                ↺ Reset to Real-World Time
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
