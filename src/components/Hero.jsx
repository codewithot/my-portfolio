import React from 'react';
import { RotatingBadge } from './RotatingBadge';
import avatarImg from '../assets/avatar.jpg';
import './Hero.css';

export function Hero({ onExploreWorks }) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          {/* Avatar Portrait */}
          <div className="hero-avatar-wrapper">
            <img
              src={avatarImg}
              alt="Victory Ikuomola"
              className="hero-avatar"
              width="120"
              height="120"
            />
          </div>

          {/* Hero Headline */}
          <h1 className="hero-title">
            Hello! I am Victory Ikuomola,<br />
            a software engineer.
          </h1>

          {/* Hero Bio / Subtitle */}
          <p className="hero-description">
            With 5+ years of hands-on experience, I build scalable backend systems, modern <span className="desc-highlight">full-stack applications</span>, and cloud-native solutions across the JavaScript, Java, and Python ecosystems.
          </p>

          {/* Real-time Status Indicator */}
          <div className="hero-status">
            <span className="status-square-icon" aria-hidden="true" />
            <span className="status-text">
              Building in <span className="status-highlight">public</span>
              <span className="status-dot-sep">·</span>
              Turning <span className="status-highlight">ideas into products</span>
              <span className="status-dot-sep">·</span>
              Dad duties <span className="status-highlight">in between 👨‍👧</span>
            </span>
          </div>
        </div>

        {/* Floating Rotating "MY WORKS" Stamp */}
        <div className="hero-stamp-wrapper">
          <RotatingBadge onClick={onExploreWorks} />
        </div>
      </div>
    </section>
  );
}
