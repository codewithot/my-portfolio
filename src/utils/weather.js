/**
 * Weather & Geolocation utility using free public APIs:
 * 1. navigator.geolocation (or IP fallback via geojs / ipapi)
 * 2. Open-Meteo free weather API (no API key required)
 */

// WMO Weather Interpretation Codes (WW)
export function interpretWmoCode(code) {
  if (code === 0) return { type: 'clear', label: 'Clear Sky', icon: '☀️' };
  if (code === 1) return { type: 'clear', label: 'Mainly Clear', icon: '🌤️' };
  if (code === 2) return { type: 'cloudy', label: 'Partly Cloudy', icon: '⛅' };
  if (code === 3) return { type: 'cloudy', label: 'Overcast', icon: '☁️' };
  if (code >= 45 && code <= 48) return { type: 'fog', label: 'Foggy', icon: '🌫️' };
  if (code >= 51 && code <= 57) return { type: 'drizzle', label: 'Light Drizzle', icon: '🌦️' };
  if (code >= 61 && code <= 67) return { type: 'rain', label: 'Rain', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { type: 'snow', label: 'Snow', icon: '❄️' };
  if (code >= 80 && code <= 82) return { type: 'rain', label: 'Rain Showers', icon: '🌧️' };
  if (code >= 85 && code <= 86) return { type: 'snow', label: 'Snow Showers', icon: '🌨️' };
  if (code >= 95 && code <= 99) return { type: 'thunderstorm', label: 'Thunderstorm', icon: '⛈️' };
  return { type: 'clear', label: 'Clear', icon: '☀️' };
}

/**
 * Get coordinates via browser geolocation or IP fallback
 */
export async function getUserLocation() {
  // 1. Try browser HTML5 Geolocation API
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 4000,
          maximumAge: 1000 * 60 * 15, // 15 mins cache
        });
      });
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        source: 'gps',
      };
    } catch {
      // Permission denied or timed out — fall back to IP location
    }
  }

  // 2. IP-based location fallback (CORS-friendly, no auth needed)
  try {
    const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
    if (res.ok) {
      const data = await res.json();
      return {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        city: data.city || data.region,
        country: data.country_code,
        source: 'ip',
      };
    }
  } catch {
    // Second IP fallback
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        return {
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city,
          country: data.country_code,
          source: 'ip',
        };
      }
    } catch {
      // Fallback
    }
  }

  // Default coordinate fallback if completely offline or blocked
  return {
    latitude: 6.5244,
    longitude: 3.3792,
    city: 'Local',
    source: 'fallback',
  };
}

/**
 * Fetch live weather from Open-Meteo
 */
export async function fetchLiveWeather() {
  try {
    // Check local session cache first (5-minute cache)
    const cached = sessionStorage.getItem('celestial_weather_cache');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 1000 * 60 * 5) {
        return parsed.data;
      }
    }

    const loc = await getUserLocation();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=weather_code,temperature_2m,is_day,precipitation,rain,cloud_cover&timezone=auto`;
    const res = await fetch(url);

    if (!res.ok) throw new Error('Weather API error');

    const data = await res.json();
    const current = data.current;
    const wmo = interpretWmoCode(current.weather_code);

    const weatherData = {
      weatherType: wmo.type, // 'clear' | 'cloudy' | 'rain' | 'drizzle' | 'thunderstorm' | 'snow' | 'fog'
      label: wmo.label,
      icon: wmo.icon,
      temperature: Math.round(current.temperature_2m),
      cloudCover: current.cloud_cover ?? (wmo.type === 'cloudy' ? 75 : 10),
      rainAmount: current.rain ?? (wmo.type === 'rain' ? 3.5 : 0),
      isDay: Boolean(current.is_day),
      city: loc.city || 'Local',
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    sessionStorage.setItem(
      'celestial_weather_cache',
      JSON.stringify({ timestamp: Date.now(), data: weatherData })
    );

    return weatherData;
  } catch {
    // Offline / fallback state
    return {
      weatherType: 'clear',
      label: 'Clear Sky',
      icon: '☀️',
      temperature: 24,
      cloudCover: 10,
      rainAmount: 0,
      isDay: true,
      city: 'Local',
      updatedAt: 'Now',
    };
  }
}
