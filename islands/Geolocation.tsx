import { useState, useEffect } from "preact/hooks";

interface LocalWeather {
  temp: number;
  description: string;
  time: string;
}

export default function Geolocation() {
  const [localWeather, setLocalWeather] = useState<LocalWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await response.json();
          
          setLocalWeather({
            temp: data.current.temp,
            description: data.current.weather[0].description,
            time: new Date(data.current.dt * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          });
        } catch (_err) {
          setGeoError("Failed to fetch weather data");
        } finally {
          setLoading(false);
        }
      },
      (_error) => {
        setGeoError("Please enable location access");
        setLoading(false);
      }
    );
  }, []);

  return (
    <section class="weather-card">
      <h2 class="weather-card__title">Current Location</h2>
      
      {loading && <p>Detecting location...</p>}
      {geoError && <p class="error">{geoError}</p>}

      {localWeather && (
        <div class="current-weather">
          <p>Local Time: {localWeather.time}</p>
          <p>Temperature: {Math.round(localWeather.temp)}°C</p>
          <p>Condition: {localWeather.description}</p>
        </div>
      )}
    </section>
  );
}