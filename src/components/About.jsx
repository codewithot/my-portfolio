import React from 'react';
import { RotatingBadge } from './RotatingBadge';
import aboutPhoto from '../assets/about-photo.jpg';
import './About.css';

export function About({ onWritingsClick }) {
  return (
    <section className="about-section">
      <div className="about-layout">

        {/* Left — Big tagline */}
        <div className="about-left">
          <h1 className="about-tagline">
            Building systems that scale, ship, and actually work.
          </h1>
        </div>

        {/* Center — Photo card */}
        <div className="about-center">
          <div className="about-photo-card">
            <img
              src={aboutPhoto}
              alt="Victory Ikuomola"
              className="about-photo"
            />
          </div>
        </div>

        {/* Right — Secondary tagline + blurb + badge */}
        <div className="about-right">
          <h2 className="about-secondary">
            Engineer by day, dad by night, and a systems thinker in between.
          </h2>
          <p className="about-blurb">
            When I'm not shipping APIs or orchestrating Kubernetes pipelines, I'm probably reading about architecture patterns, nerding out over a good Afrobeats set, or sneaking in quality time with my daughter.
          </p>
          <div className="about-badge">
            <RotatingBadge
              text="· WRITINGS · WRITINGS · WRITINGS "
              ariaLabel="Go to Writings"
              onClick={onWritingsClick}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
