import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Works } from './components/Works';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

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

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
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
