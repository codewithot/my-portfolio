import React, { useState, useEffect, useMemo, useRef } from 'react';
import { getCelestialState } from '../utils/celestial';
import './CelestialSky.css';

/**
 * 60fps Canvas-based rain particle simulator
 */
function RainCanvas({ intensity = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const dropCount = Math.floor(130 * intensity);
    const drops = [];
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * (width + 400) - 200,
        y: Math.random() * height,
        length: 16 + Math.random() * 20,
        speed: 13 + Math.random() * 11,
        opacity: 0.12 + Math.random() * 0.3,
        slant: -3.2 - Math.random() * 1.6,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.strokeStyle = `rgba(190, 220, 255, ${d.opacity})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.slant * 4, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x += d.slant * (d.speed / 4.5);

        if (d.y > height) {
          d.y = -35;
          d.x = Math.random() * (width + 400) - 200;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return <canvas ref={canvasRef} className="celestial-rain-canvas" />;
}

export function CelestialSky({ theme, externalTime, weather }) {
  const isDark = theme === 'dark';

  // Live browser clock state (updates every 10 seconds)
  const [localHours, setLocalHours] = useState(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLocalHours(now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const activeHours = typeof externalTime === 'number' ? externalTime : localHours;
  const celestial = useMemo(() => getCelestialState(activeHours), [activeHours]);

  // Weather variables
  const weatherType = weather?.weatherType || 'clear';
  const isRaining = weatherType === 'rain' || weatherType === 'drizzle' || weatherType === 'thunderstorm';
  const isStorm = weatherType === 'thunderstorm';
  const isCloudy = weatherType === 'cloudy' || isRaining || (weather?.cloudCover ?? 0) > 40;
  const isDrizzle = weatherType === 'drizzle';

  // Generate deterministic starfield around the top right
  const stars = useMemo(() => {
    const starList = [];
    for (let i = 0; i < 70; i++) {
      const seed = i * 137.5;
      const x = 52 + ((seed * 3.7) % 46);
      const y = 2 + ((seed * 7.1) % 46);
      const size = 0.8 + ((seed * 1.9) % 2.2);
      const delay = (seed * 0.4) % 4;
      const duration = 2.2 + ((seed * 0.7) % 3.5);
      const isBright = i % 9 === 0;
      starList.push({ id: i, x, y, size, delay, duration, isBright });
    }
    return starList;
  }, []);

  if (!isDark) {
    return null;
  }

  const isSun = celestial.type === 'sun';
  // If raining or heavy clouds, stars are obscured
  const effectiveStarsOpacity = isCloudy ? 0 : celestial.starsOpacity;

  return (
    <div
      className={`celestial-sky-root period-${celestial.period} weather-${weatherType}`}
      aria-hidden="true"
    >
      {/* 1. Large Ambient Atmospheric Sky Bloom */}
      <div
        className="celestial-ambient-bloom"
        style={{
          background: isStorm
            ? 'radial-gradient(ellipse 950px 750px at 92% 8%, rgba(20, 25, 45, 0.75), rgba(15, 18, 32, 0.45) 50%, transparent 80%)'
            : isRaining
            ? 'radial-gradient(ellipse 950px 750px at 92% 8%, rgba(45, 65, 95, 0.4), rgba(20, 35, 55, 0.2) 50%, transparent 80%)'
            : celestial.skyGlow,
        }}
      />

      {/* 2. Ambient page highlight wash */}
      <div
        className="celestial-page-wash"
        style={{
          background: isRaining
            ? 'radial-gradient(circle 800px at 85% 15%, rgba(60, 95, 140, 0.05), transparent 70%)'
            : `radial-gradient(circle 800px at 85% 15%, ${celestial.ambientPageTint}, transparent 70%)`,
        }}
      />

      {/* 3. Twinkling Stars in Night Sky (Visible when clear/night) */}
      <div
        className="celestial-stars-layer"
        style={{
          opacity: effectiveStarsOpacity,
          transition: 'opacity 1.2s ease',
        }}
      >
        <svg
          className="stars-svg"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {stars.map((star) => (
            <circle
              key={star.id}
              cx={`${star.x * 10}`}
              cy={`${star.y * 6}`}
              r={star.size}
              fill={star.isBright ? '#ffffff' : '#d8e6ff'}
              className="star-point"
              style={{
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                opacity: star.isBright ? 0.95 : 0.65,
              }}
            />
          ))}
          <g transform="translate(820, 95)" className="star-gleam">
            <line x1="-6" y1="0" x2="6" y2="0" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>
          <g transform="translate(680, 160)" className="star-gleam" style={{ animationDelay: '1.8s' }}>
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#d5e5ff" strokeWidth="0.7" opacity="0.7" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#d5e5ff" strokeWidth="0.7" opacity="0.7" />
            <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* 4. Realistic Volumetric Light Rays (God Rays) */}
      <div
        className="celestial-volumetric-rays"
        style={{
          opacity: isRaining ? 0.45 : isCloudy ? 0.65 : 0.95,
          filter: isRaining ? 'blur(6px)' : 'none',
          transition: 'opacity 1s ease',
        }}
      >
        <svg
          className="volumetric-rays-svg"
          viewBox="0 0 1400 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="celestialRayGrad1" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={celestial.rayGlow || celestial.rayColor} stopOpacity="0.85" />
              <stop offset="25%" stopColor={celestial.rayColor} stopOpacity="0.5" />
              <stop offset="65%" stopColor={celestial.rayColor} stopOpacity="0.18" />
              <stop offset="100%" stopColor={celestial.rayColor} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="celestialRayGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={celestial.rayGlow || celestial.rayColor} stopOpacity="0.7" />
              <stop offset="35%" stopColor={celestial.rayColor} stopOpacity="0.4" />
              <stop offset="75%" stopColor={celestial.rayColor} stopOpacity="0.1" />
              <stop offset="100%" stopColor={celestial.rayColor} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="celestialRayGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={celestial.rayGlow || celestial.rayColor} stopOpacity="0.9" />
              <stop offset="30%" stopColor={celestial.rayColor} stopOpacity="0.45" />
              <stop offset="80%" stopColor={celestial.rayColor} stopOpacity="0.08" />
              <stop offset="100%" stopColor={celestial.rayColor} stopOpacity="0" />
            </linearGradient>
            <filter id="rayBlur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          <g filter="url(#rayBlur)">
            <polygon
              points="1260,45 -200,680 -200,820 1260,45"
              fill="url(#celestialRayGrad1)"
              className="ray-shaft ray-shaft-1"
            />
            <polygon
              points="1260,45 80,900 240,900 1260,45"
              fill="url(#celestialRayGrad2)"
              className="ray-shaft ray-shaft-2"
            />
            <polygon
              points="1260,45 320,900 460,900 1260,45"
              fill="url(#celestialRayGrad3)"
              className="ray-shaft ray-shaft-3"
            />
            <polygon
              points="1260,45 540,900 660,900 1260,45"
              fill="url(#celestialRayGrad1)"
              className="ray-shaft ray-shaft-4"
            />
            <polygon
              points="1260,45 780,900 900,900 1260,45"
              fill="url(#celestialRayGrad2)"
              className="ray-shaft ray-shaft-5"
            />
            <polygon
              points="1260,45 -150,420 -150,530 1260,45"
              fill="url(#celestialRayGrad3)"
              className="ray-shaft ray-shaft-6"
            />
          </g>
        </svg>
      </div>

      {/* 5. The Celestial Body (Realistic Sun or Moon) */}
      <div
        className="celestial-orb-anchor"
        style={{
          opacity: isStorm ? 0.35 : isRaining ? 0.6 : isCloudy ? 0.75 : 1,
          transition: 'opacity 1s ease',
        }}
      >
        {isSun ? (
          /* =================== REALISTIC SUN =================== */
          <div className="realistic-sun-container">
            <div
              className="sun-corona-outer"
              style={{
                background: `radial-gradient(circle, ${celestial.sunAtmosphere} 0%, rgba(255, 180, 0, 0.15) 45%, transparent 72%)`,
              }}
            />
            <div
              className="sun-corona-mid"
              style={{
                boxShadow: `0 0 70px 25px ${celestial.sunCoronaColor}, inset 0 0 35px #ffffff`,
              }}
            />
            {!isRaining && (
              <div className="sun-diffraction-spikes">
                <span className="diffraction-ray horizontal" />
                <span className="diffraction-ray vertical" />
                <span className="diffraction-ray diagonal-1" />
                <span className="diffraction-ray diagonal-2" />
              </div>
            )}
            <svg
              className="sun-sphere-svg"
              viewBox="0 0 100 100"
              width="90"
              height="90"
            >
              <defs>
                <radialGradient id="sunCoreGrad" cx="48%" cy="48%" r="52%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="32%" stopColor={celestial.sunInnerGlow} />
                  <stop offset="65%" stopColor={celestial.sunCoronaColor} />
                  <stop offset="90%" stopColor="#f77f00" />
                  <stop offset="100%" stopColor="#d62828" />
                </radialGradient>
                <filter id="sunGlowFilter">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="url(#sunCoreGrad)"
                filter="url(#sunGlowFilter)"
              />
              <circle
                cx="50"
                cy="50"
                r="45.5"
                fill="none"
                stroke={celestial.sunCoronaColor}
                strokeWidth="1.5"
                opacity="0.8"
                strokeDasharray="4 8 12 6"
                className="solar-prominence-ring"
              />
            </svg>
            {!isRaining && (
              <div className="sun-lens-flare">
                <span className="flare-orb flare-1" />
                <span className="flare-ring flare-2" />
                <span className="flare-orb flare-3" />
              </div>
            )}
          </div>
        ) : (
          /* =================== REALISTIC MOON =================== */
          <div className="realistic-moon-container">
            <div
              className="moon-halo-outer"
              style={{
                background: `radial-gradient(circle, ${celestial.moonGlow} 0%, rgba(180, 215, 255, 0.16) 42%, rgba(130, 180, 255, 0.05) 65%, transparent 78%)`,
              }}
            />
            <div className="moon-halo-inner" />
            <svg
              className="moon-sphere-svg"
              viewBox="0 0 100 100"
              width="90"
              height="90"
            >
              <defs>
                <radialGradient id="moonBaseGrad" cx="38%" cy="36%" r="62%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#e8edf5" />
                  <stop offset="60%" stopColor="#c8d2e0" />
                  <stop offset="85%" stopColor="#9daaba" />
                  <stop offset="100%" stopColor="#768496" />
                </radialGradient>
                <radialGradient id="moon3DSphere" cx="36%" cy="34%" r="64%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                  <stop offset="55%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="85%" stopColor="#09121d" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#04080e" stopOpacity="0.75" />
                </radialGradient>
                <filter id="mareBlur" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="1.8" />
                </filter>
                <filter id="craterGlow">
                  <feGaussianBlur stdDeviation="0.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <clipPath id="moonDiskClip">
                  <circle cx="50" cy="50" r="46" />
                </clipPath>
              </defs>
              <g clipPath="url(#moonDiskClip)">
                <circle cx="50" cy="50" r="46" fill="url(#moonBaseGrad)" />
                <g filter="url(#mareBlur)" opacity="0.68">
                  <path
                    d="M 20 26 C 26 16, 44 16, 48 24 C 54 32, 46 44, 38 48 C 28 52, 18 44, 20 26 Z"
                    fill="#556172"
                  />
                  <path
                    d="M 52 26 C 60 22, 68 25, 70 34 C 68 40, 58 42, 53 36 C 50 32, 50 28, 52 26 Z"
                    fill="#4e5a6b"
                  />
                  <path
                    d="M 56 36 C 66 34, 74 38, 74 48 C 70 54, 60 56, 54 50 C 51 44, 53 38, 56 36 Z"
                    fill="#495566"
                  />
                  <ellipse cx="78" cy="40" rx="6.5" ry="5" fill="#465161" transform="rotate(-15 78 40)" />
                  <path
                    d="M 32 56 C 42 54, 48 58, 48 68 C 44 76, 32 78, 28 72 C 26 64, 28 58, 32 56 Z"
                    fill="#566375"
                  />
                  <path
                    d="M 64 54 C 74 52, 78 60, 76 68 C 72 74, 62 74, 58 66 C 56 60, 58 56, 64 54 Z"
                    fill="#505c6e"
                  />
                </g>
                <g opacity="0.6">
                  <line x1="46" y1="78" x2="16" y2="52" stroke="#ffffff" strokeWidth="0.8" opacity="0.45" />
                  <line x1="46" y1="78" x2="26" y2="34" stroke="#ffffff" strokeWidth="0.9" opacity="0.5" />
                  <line x1="46" y1="78" x2="42" y2="18" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
                  <line x1="46" y1="78" x2="68" y2="28" stroke="#ffffff" strokeWidth="0.9" opacity="0.5" />
                  <line x1="46" y1="78" x2="82" y2="48" stroke="#ffffff" strokeWidth="0.75" opacity="0.4" />
                  <line x1="46" y1="78" x2="76" y2="76" stroke="#ffffff" strokeWidth="0.8" opacity="0.45" />
                  <line x1="46" y1="78" x2="32" y2="86" stroke="#ffffff" strokeWidth="0.7" opacity="0.4" />
                </g>
                <circle cx="46" cy="78" r="3" fill="#ffffff" filter="url(#craterGlow)" />
                <circle cx="46" cy="78" r="1.6" fill="#ccd7e6" />
                <g filter="url(#craterGlow)" opacity="0.85">
                  <circle cx="36" cy="42" r="3.2" fill="#eef3fa" opacity="0.65" />
                  <circle cx="36" cy="42" r="1.4" fill="#ffffff" />
                  <circle cx="36.5" cy="42.5" r="0.8" fill="#7a8799" />
                </g>
                <circle cx="25" cy="43" r="2.2" fill="#ffffff" opacity="0.75" />
                <circle cx="25" cy="43" r="0.9" fill="#8895a6" />
                <circle cx="24" cy="31" r="1.8" fill="#ffffff" filter="url(#craterGlow)" />
                <circle cx="50" cy="50" r="46" fill="url(#moon3DSphere)" />
                <path
                  d="M 50 4 Q 88 50 50 96 A 46 46 0 0 1 50 4"
                  fill="#000000"
                  opacity="0.14"
                />
              </g>
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgba(215, 235, 255, 0.45)"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        )}
      </div>

      {/* 6. Atmospheric Drifting Cloud Silhouettes (Visible in cloudy / rainy weather) */}
      {isCloudy && (
        <div className="celestial-clouds-wrapper">
          <div className={`cloud-puff cloud-1 ${isStorm ? 'storm-cloud' : ''}`} />
          <div className={`cloud-puff cloud-2 ${isStorm ? 'storm-cloud' : ''}`} />
          <div className={`cloud-puff cloud-3 ${isStorm ? 'storm-cloud' : ''}`} />
        </div>
      )}

      {/* 7. Realistic Falling Rain Canvas (Active when raining/drizzle/storm) */}
      {isRaining && (
        <div className="celestial-rain-container">
          <RainCanvas intensity={isStorm ? 1.6 : isDrizzle ? 0.6 : 1.1} />
          {/* Subtle bottom ground splash mist */}
          <div className="celestial-rain-mist" />
        </div>
      )}

      {/* 8. Distant Lightning Flash for Thunderstorms */}
      {isStorm && <div className="celestial-lightning-flash" />}
    </div>
  );
}
