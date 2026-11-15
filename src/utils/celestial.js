/**
 * Calculates celestial properties based on decimal hour (0 - 24)
 * @param {number} hours Decimal hour of day (e.g. 11.25 = 11:15 AM)
 */
export function getCelestialState(hours) {
  // Normalize hours to 0 - 24
  const h = ((hours % 24) + 24) % 24;

  // Periods:
  // 05:30 - 06:45: Dawn / Sunrise transition
  // 06:45 - 09:30: Golden Morning Sun
  // 09:30 - 16:30: Midday Sun (Bright & radiant)
  // 16:30 - 19:15: Golden Hour / Sunset (Warm amber & crimson)
  // 19:15 - 20:15: Dusk / Twilight transition to Moon
  // 20:15 - 05:30: Deep Night (Moon dominant with stars)

  if (h >= 5.5 && h < 6.75) {
    // Dawn -> Sunrise
    const progress = (h - 5.5) / 1.25;
    return {
      type: 'sun',
      period: 'dawn',
      label: 'Dawn Sunrise',
      skyGlow: `radial-gradient(ellipse 850px 650px at 92% 8%, rgba(255, 140, 60, 0.16), rgba(240, 90, 80, 0.07) 50%, transparent 80%)`,
      sunCoreColor: '#ffffff',
      sunInnerGlow: '#ffe8a3',
      sunCoronaColor: '#ff9800',
      sunAtmosphere: 'rgba(255, 152, 0, 0.20)',
      rayColor: 'rgba(255, 170, 90, 0.09)',
      rayGlow: 'rgba(255, 140, 60, 0.13)',
      starsOpacity: Math.max(0, 0.7 - progress * 2),
      ambientPageTint: 'rgba(255, 140, 70, 0.02)',
      elevationAngle: 18 + progress * 15,
    };
  } else if (h >= 6.75 && h < 9.5) {
    // Early Morning Golden Sun
    const progress = (h - 6.75) / 2.75;
    return {
      type: 'sun',
      period: 'morning',
      label: 'Morning Sun',
      skyGlow: `radial-gradient(ellipse 900px 700px at 92% 8%, rgba(255, 190, 80, 0.18), rgba(255, 150, 50, 0.07) 50%, transparent 80%)`,
      sunCoreColor: '#ffffff',
      sunInnerGlow: '#fff3b0',
      sunCoronaColor: '#ffb703',
      sunAtmosphere: 'rgba(255, 183, 3, 0.20)',
      rayColor: 'rgba(255, 205, 110, 0.10)',
      rayGlow: 'rgba(255, 180, 70, 0.14)',
      starsOpacity: 0,
      ambientPageTint: 'rgba(255, 180, 80, 0.025)',
      elevationAngle: 33 + progress * 20,
    };
  } else if (h >= 9.5 && h < 16.5) {
    // Midday Radiant Sun
    return {
      type: 'sun',
      period: 'midday',
      label: 'Midday Sun',
      skyGlow: `radial-gradient(ellipse 950px 720px at 92% 8%, rgba(255, 235, 170, 0.19), rgba(255, 200, 100, 0.08) 45%, rgba(255, 170, 50, 0.025) 70%, transparent 85%)`,
      sunCoreColor: '#ffffff',
      sunInnerGlow: '#fffbe6',
      sunCoronaColor: '#ffc300',
      sunAtmosphere: 'rgba(255, 214, 10, 0.22)',
      rayColor: 'rgba(255, 240, 190, 0.11)',
      rayGlow: 'rgba(255, 220, 130, 0.15)',
      starsOpacity: 0,
      ambientPageTint: 'rgba(255, 215, 130, 0.03)',
      elevationAngle: 55,
    };
  } else if (h >= 16.5 && h < 19.25) {
    // Golden Hour / Sunset
    const progress = (h - 16.5) / 2.75;
    return {
      type: 'sun',
      period: 'sunset',
      label: 'Golden Sunset',
      skyGlow: `radial-gradient(ellipse 950px 720px at 92% 8%, rgba(255, 120, 50, 0.20), rgba(230, 70, 70, 0.09) 45%, rgba(130, 40, 110, 0.035) 70%, transparent 85%)`,
      sunCoreColor: '#ffffff',
      sunInnerGlow: '#ffd166',
      sunCoronaColor: '#f77f00',
      sunAtmosphere: 'rgba(247, 127, 0, 0.24)',
      rayColor: 'rgba(255, 130, 50, 0.11)',
      rayGlow: 'rgba(255, 90, 30, 0.15)',
      starsOpacity: 0,
      ambientPageTint: 'rgba(255, 100, 40, 0.03)',
      elevationAngle: 45 - progress * 25,
    };
  } else if (h >= 19.25 && h < 20.25) {
    // Twilight transition: Sun dips, Moon and stars rise
    const progress = (h - 19.25) / 1.0;
    return {
      type: progress > 0.45 ? 'moon' : 'sun',
      period: 'twilight',
      label: 'Evening Twilight',
      skyGlow: `radial-gradient(ellipse 900px 700px at 92% 8%, rgba(100, 120, 200, 0.16), rgba(60, 70, 140, 0.07) 50%, transparent 80%)`,
      moonGlow: 'rgba(180, 210, 255, 0.20)',
      rayColor: 'rgba(180, 210, 255, 0.07)',
      rayGlow: 'rgba(150, 190, 255, 0.11)',
      starsOpacity: 0.2 + progress * 0.4,
      ambientPageTint: 'rgba(100, 140, 220, 0.02)',
      elevationAngle: 25,
    };
  } else {
    // Deep Night: Moon dominant, glowing halo, silvery beams, twinkling stars
    return {
      type: 'moon',
      period: 'night',
      label: 'Moonlit Night',
      skyGlow: `radial-gradient(ellipse 900px 720px at 92% 8%, rgba(160, 205, 255, 0.14), rgba(70, 110, 190, 0.06) 45%, rgba(30, 50, 100, 0.025) 70%, transparent 85%)`,
      moonGlow: 'rgba(200, 230, 255, 0.22)',
      moonAtmosphere: 'rgba(140, 190, 255, 0.12)',
      rayColor: 'rgba(195, 225, 255, 0.07)',
      rayGlow: 'rgba(160, 205, 255, 0.11)',
      starsOpacity: 0.7,
      ambientPageTint: 'rgba(130, 180, 255, 0.02)',
      elevationAngle: 48,
    };
  }
}

/**
 * Format decimal hours to HH:MM AM/PM string
 */
export function formatTime(decimalHours) {
  const totalMinutes = Math.floor(decimalHours * 60);
  const h24 = Math.floor(totalMinutes / 60) % 24;
  const mins = totalMinutes % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const padMins = mins < 10 ? `0${mins}` : mins;
  return `${h12}:${padMins} ${period}`;
}

