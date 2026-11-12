import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Works } from './components/Works';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CelestialSky } from './components/CelestialSky';
import { fetchLiveWeather } from './utils/weather';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  // Celestial time tracking (defaults strictly to browser's real clock)
  const [isLiveTime, setIsLiveTime] = useState(true);
  const [customHours, setCustomHours] = useState(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  });

  // Weather tracking (defaults strictly to browser's location weather)
  const [isLiveWeather, setIsLiveWeather] = useState(true);
  const [customWeatherType, setCustomWeatherType] = useState('rain');
  const [liveWeather, setLiveWeather] = useState({
    weatherType: 'clear',
    label: 'Detecting weather...',
    icon: '☀️',
    temperature: 24,
    cloudCover: 10,
    rainAmount: 0,
    city: 'Detecting...',
  });

  // Fetch live weather on mount & periodically
  const refreshWeather = useCallback(() => {
    fetchLiveWeather().then(setLiveWeather);
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchLiveWeather().then((data) => {
      if (isMounted) setLiveWeather(data);
    });
    // Refresh weather every 10 minutes
    const interval = setInterval(() => {
      fetchLiveWeather().then((data) => {
        if (isMounted) setLiveWeather(data);
      });
    }, 1000 * 60 * 10);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Compute active weather based on live vs manual preview
  const activeWeather = useMemo(() => {
    if (isLiveWeather) {
      return liveWeather;
    }
    const weatherMap = {
      clear: { weatherType: 'clear', label: 'Clear Sky', icon: '☀️', cloudCover: 5, rainAmount: 0 },
      cloudy: { weatherType: 'cloudy', label: 'Overcast Clouds', icon: '⛅', cloudCover: 75, rainAmount: 0 },
      rain: { weatherType: 'rain', label: 'Rain Showers', icon: '🌧️', cloudCover: 90, rainAmount: 4 },
      thunderstorm: { weatherType: 'thunderstorm', label: 'Thunderstorm', icon: '⛈️', cloudCover: 98, rainAmount: 8 },
    };
    const preset = weatherMap[customWeatherType] || weatherMap.clear;
    return {
      ...liveWeather,
      ...preset,
      city: `${liveWeather.city || 'Local'} (Preview)`,
    };
  }, [isLiveWeather, liveWeather, customWeatherType]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-container">
      {/* Background ambient lighting */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* Realistic celestial sun, moon & rain lighting system for dark mode */}
      <CelestialSky
        theme={theme}
        externalTime={isLiveTime ? null : customHours}
        weather={activeWeather}
      />

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        customHours={customHours}
        setCustomHours={setCustomHours}
        isLiveTime={isLiveTime}
        setIsLiveTime={setIsLiveTime}
        weather={activeWeather}
        isLiveWeather={isLiveWeather}
        setIsLiveWeather={setIsLiveWeather}
        setCustomWeather={setCustomWeatherType}
        onRefreshWeather={refreshWeather}
      />

      {/* Main View Area */}
      <main className="main-content">
        {activeTab === 'home' && (
          <Hero onExploreWorks={() => setActiveTab('works')} />
        )}

        {activeTab === 'works' && (
          <Works onAboutClick={() => setActiveTab('about')} />
        )}

        {activeTab === 'about' && (
          <About onWritingsClick={() => setActiveTab('writings')} />
        )}

        {activeTab === 'writings' && (
          <section className="tab-view">
            <div className="tab-header">
              <h2 className="tab-title">Writings & Thoughts</h2>
              <p className="tab-subtitle">
                Essays on software engineering, interface design, and scaling web applications in Africa.
              </p>
            </div>
            <div className="cards-grid">
              <div className="feature-card">
                <span className="card-tag">Technical Essay</span>
                <h3 className="card-title">Building Resilient Web Apps for Low-Bandwidth Networks</h3>
                <p className="card-desc">
                  Optimizing bundle sizes, client-side caching strategies, and offline-first patterns.
                </p>
              </div>
              <div className="feature-card">
                <span className="card-tag">Engineering Leadership</span>
                <h3 className="card-title">The Art of Frontend Component Architecture</h3>
                <p className="card-desc">
                  Strategies for building composable, long-lasting component hierarchies that scale across teams.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'contact' && <Contact />}
      </main>

      {/* Bottom Footer */}
      <Footer onLogoClick={() => setActiveTab('home')} />
    </div>
  );
}
