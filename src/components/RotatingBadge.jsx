import React from 'react';
import './RotatingBadge.css';

export function RotatingBadge({ onClick, text, ariaLabel }) {
  const circleText = text || '· MY WORKS · MY WORKS · MY WORKS\u00a0';
  const label = ariaLabel || 'Explore My Works';
  return (
    <div
      className="badge-container"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      {/* Rotating Circular Text SVG */}
      <svg className="badge-svg" viewBox="0 0 160 160">
        <defs>
          {/* Counter-clockwise path so letters face outwards with baseline inside, exactly as in reference */}
          <path
            id="worksCirclePath"
            d="M 80, 80 m -44, 0 a 44,44 0 0,0 88,0 a 44,44 0 0,0 -88,0"
            fill="none"
          />
        </defs>
        <text className="badge-svg-text">
          <textPath href="#worksCirclePath" startOffset="0%">
            {circleText}
          </textPath>
        </text>
      </svg>

      {/* Center arrow matching reference */}
      <div className="badge-arrow">
        <svg
          width="26"
          height="16"
          viewBox="0 0 32 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="8" x2="26" y2="8" />
          <polyline points="19,2 26,8 19,14" />
        </svg>
      </div>
    </div>
  );
}
