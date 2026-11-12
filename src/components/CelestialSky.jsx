import React, { useState, useEffect, useMemo } from 'react';
import { getCelestialState } from '../utils/celestial';
import './CelestialSky.css';

export function CelestialSky({ theme, externalTime }) {
  const isDark = theme === 'dark';

  // Local state for auto clock if not controlled externally
  const [localHours, setLocalHours] = useState(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  });

  // Track live real-world time continuously
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLocalHours(now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const activeHours = typeof externalTime === 'number' ? externalTime : localHours;
  const celestial = useMemo(() => getCelestialState(activeHours), [activeHours]);

  // Generate deterministic starfield around the top right
  const stars = useMemo(() => {
    const starList = [];
    // Seeded distribution concentrated in top-right (x: 52% - 98%, y: 2% - 50%)
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

  return (
    <div
      className={`celestial-sky-root period-${celestial.period}`}
      aria-hidden="true"
    >
      {/* 1. Large Ambient Atmospheric Sky Bloom */}
      <div
        className="celestial-ambient-bloom"
        style={{ background: celestial.skyGlow }}
      />

      {/* 2. Ambient page highlight wash */}
      <div
        className="celestial-page-wash"
        style={{
          background: `radial-gradient(circle 800px at 85% 15%, ${celestial.ambientPageTint}, transparent 70%)`,
        }}
      />

      {/* 3. Twinkling Stars in Night Sky (Fade in when moon/dusk) */}
      <div
        className="celestial-stars-layer"
        style={{
          opacity: celestial.starsOpacity,
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
          {/* Prominent glittering cross stars */}
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
      <div className="celestial-volumetric-rays">
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

          {/* Angled light shafts originating from celestial position (~1260, 45) */}
          <g filter="url(#rayBlur)">
            {/* Ray 1: Wide sweeping base shaft */}
            <polygon
              points="1260,45 -200,680 -200,820 1260,45"
              fill="url(#celestialRayGrad1)"
              className="ray-shaft ray-shaft-1"
            />
            {/* Ray 2: Center intense shaft beaming across hero */}
            <polygon
              points="1260,45 80,900 240,900 1260,45"
              fill="url(#celestialRayGrad2)"
              className="ray-shaft ray-shaft-2"
            />
            {/* Ray 3: Diagonal shaft toward avatar */}
            <polygon
              points="1260,45 320,900 460,900 1260,45"
              fill="url(#celestialRayGrad3)"
              className="ray-shaft ray-shaft-3"
            />
            {/* Ray 4: Upper middle shaft */}
            <polygon
              points="1260,45 540,900 660,900 1260,45"
              fill="url(#celestialRayGrad1)"
              className="ray-shaft ray-shaft-4"
            />
            {/* Ray 5: Subtle steep shaft */}
            <polygon
              points="1260,45 780,900 900,900 1260,45"
              fill="url(#celestialRayGrad2)"
              className="ray-shaft ray-shaft-5"
            />
            {/* Ray 6: Upper accent shaft */}
            <polygon
              points="1260,45 -150,420 -150,530 1260,45"
              fill="url(#celestialRayGrad3)"
              className="ray-shaft ray-shaft-6"
            />
          </g>
        </svg>
      </div>

      {/* 5. The Celestial Body (Realistic Sun or Moon) */}
      <div className="celestial-orb-anchor">
        {isSun ? (
          /* =================== REALISTIC SUN =================== */
          <div className="realistic-sun-container">
            {/* Outer pulsating atmospheric corona */}
            <div
              className="sun-corona-outer"
              style={{
                background: `radial-gradient(circle, ${celestial.sunAtmosphere} 0%, rgba(255, 180, 0, 0.15) 45%, transparent 72%)`,
              }}
            />

            {/* Mid corona ring with solar plasma heat haze */}
            <div
              className="sun-corona-mid"
              style={{
                boxShadow: `0 0 70px 25px ${celestial.sunCoronaColor}, inset 0 0 35px #ffffff`,
              }}
            />

            {/* Diffraction Spikes / Solar Cross Flare */}
            <div className="sun-diffraction-spikes">
              <span className="diffraction-ray horizontal" />
              <span className="diffraction-ray vertical" />
              <span className="diffraction-ray diagonal-1" />
              <span className="diffraction-ray diagonal-2" />
            </div>

            {/* Inner Incandescent Solar Sphere */}
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

              {/* Solar disk */}
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="url(#sunCoreGrad)"
                filter="url(#sunGlowFilter)"
              />

              {/* Subtle solar flare prominence rim */}
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

            {/* Secondary Lens Flare along diagonal axis */}
            <div className="sun-lens-flare">
              <span className="flare-orb flare-1" />
              <span className="flare-ring flare-2" />
              <span className="flare-orb flare-3" />
            </div>
          </div>
        ) : (
          /* =================== REALISTIC MOON =================== */
          <div className="realistic-moon-container">
            {/* Atmospheric 22-degree Lunar Halo */}
            <div
              className="moon-halo-outer"
              style={{
                background: `radial-gradient(circle, ${celestial.moonGlow} 0%, rgba(180, 215, 255, 0.16) 42%, rgba(130, 180, 255, 0.05) 65%, transparent 78%)`,
              }}
            />

            {/* Delicate inner lunar ring */}
            <div className="moon-halo-inner" />

            {/* Photorealistic Moon Sphere with SVG Maria & Craters */}
            <svg
              className="moon-sphere-svg"
              viewBox="0 0 100 100"
              width="90"
              height="90"
            >
              <defs>
                {/* Base lunar regolith gradient */}
                <radialGradient id="moonBaseGrad" cx="38%" cy="36%" r="62%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#e8edf5" />
                  <stop offset="60%" stopColor="#c8d2e0" />
                  <stop offset="85%" stopColor="#9daaba" />
                  <stop offset="100%" stopColor="#768496" />
                </radialGradient>

                {/* 3D Spherical Limb Darkening & Terminator */}
                <radialGradient id="moon3DSphere" cx="36%" cy="34%" r="64%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                  <stop offset="55%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="85%" stopColor="#09121d" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#04080e" stopOpacity="0.75" />
                </radialGradient>

                {/* Soft blur for organic basaltic maria textures */}
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

                {/* Clip path for the moon disk */}
                <clipPath id="moonDiskClip">
                  <circle cx="50" cy="50" r="46" />
                </clipPath>
              </defs>

              <g clipPath="url(#moonDiskClip)">
                {/* 1. Base lunar surface */}
                <circle cx="50" cy="50" r="46" fill="url(#moonBaseGrad)" />

                {/* 2. Lunar Maria (Dark basaltic lava plains) */}
                <g filter="url(#mareBlur)" opacity="0.68">
                  {/* Oceanus Procellarum & Mare Imbrium (North-West) */}
                  <path
                    d="M 20 26 C 26 16, 44 16, 48 24 C 54 32, 46 44, 38 48 C 28 52, 18 44, 20 26 Z"
                    fill="#556172"
                  />
                  {/* Mare Serenitatis (North-East) */}
                  <path
                    d="M 52 26 C 60 22, 68 25, 70 34 C 68 40, 58 42, 53 36 C 50 32, 50 28, 52 26 Z"
                    fill="#4e5a6b"
                  />
                  {/* Mare Tranquillitatis (East-Center) */}
                  <path
                    d="M 56 36 C 66 34, 74 38, 74 48 C 70 54, 60 56, 54 50 C 51 44, 53 38, 56 36 Z"
                    fill="#495566"
                  />
                  {/* Mare Crisium (Isolated dark oval on East limb) */}
                  <ellipse cx="78" cy="40" rx="6.5" ry="5" fill="#465161" transform="rotate(-15 78 40)" />
                  {/* Mare Nubium & Humorum (South-West) */}
                  <path
                    d="M 32 56 C 42 54, 48 58, 48 68 C 44 76, 32 78, 28 72 C 26 64, 28 58, 32 56 Z"
                    fill="#566375"
                  />
                  {/* Mare Fecunditatis & Nectaris (South-East) */}
                  <path
                    d="M 64 54 C 74 52, 78 60, 76 68 C 72 74, 62 74, 58 66 C 56 60, 58 56, 64 54 Z"
                    fill="#505c6e"
                  />
                </g>

                {/* 3. Tycho Crater & Ray System (Southern Highlands) */}
                <g opacity="0.6">
                  {/* Long ejecta rays radiating from Tycho at (46, 78) */}
                  <line x1="46" y1="78" x2="16" y2="52" stroke="#ffffff" strokeWidth="0.8" opacity="0.45" />
                  <line x1="46" y1="78" x2="26" y2="34" stroke="#ffffff" strokeWidth="0.9" opacity="0.5" />
                  <line x1="46" y1="78" x2="42" y2="18" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
                  <line x1="46" y1="78" x2="68" y2="28" stroke="#ffffff" strokeWidth="0.9" opacity="0.5" />
                  <line x1="46" y1="78" x2="82" y2="48" stroke="#ffffff" strokeWidth="0.75" opacity="0.4" />
                  <line x1="46" y1="78" x2="76" y2="76" stroke="#ffffff" strokeWidth="0.8" opacity="0.45" />
                  <line x1="46" y1="78" x2="32" y2="86" stroke="#ffffff" strokeWidth="0.7" opacity="0.4" />
                </g>

                {/* Tycho Impact Crater Core */}
                <circle cx="46" cy="78" r="3" fill="#ffffff" filter="url(#craterGlow)" />
                <circle cx="46" cy="78" r="1.6" fill="#ccd7e6" />

                {/* Copernicus Crater */}
                <g filter="url(#craterGlow)" opacity="0.85">
                  <circle cx="36" cy="42" r="3.2" fill="#eef3fa" opacity="0.65" />
                  <circle cx="36" cy="42" r="1.4" fill="#ffffff" />
                  <circle cx="36.5" cy="42.5" r="0.8" fill="#7a8799" />
                </g>

                {/* Kepler Crater */}
                <circle cx="25" cy="43" r="2.2" fill="#ffffff" opacity="0.75" />
                <circle cx="25" cy="43" r="0.9" fill="#8895a6" />

                {/* Aristarchus Plateau (Brightest spot on the moon) */}
                <circle cx="24" cy="31" r="1.8" fill="#ffffff" filter="url(#craterGlow)" />

                {/* 4. 3D Spherical Volume Overlay with limb darkening */}
                <circle cx="50" cy="50" r="46" fill="url(#moon3DSphere)" />

                {/* Subtle terminator shading (gives spherical relief depth) */}
                <path
                  d="M 50 4 Q 88 50 50 96 A 46 46 0 0 1 50 4"
                  fill="#000000"
                  opacity="0.14"
                />
              </g>

              {/* Delicate glowing atmospheric rim */}
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
    </div>
  );
}
