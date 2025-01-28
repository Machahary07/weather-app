import { useState } from "preact/hooks";

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
}

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const searchLocation = async (e: Event) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("City not found");
      
      const data = await response.json();
      setWeather({
        temp: data.current.temp,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
        city: data.current.name
      });
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setWeather(null);
    }
  };

  return (
    <section class="weather-card">
      <form onSubmit={searchLocation} class="search-bar">
        <input
          type="text"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="Search city..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <p class="error">{error}</p>}

      {weather && (
        <div class="weather-result">
          <h2>{weather.city}</h2>
          <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
          <p>{Math.round(weather.temp)}°C</p>
          <p>{weather.description}</p>
        </div>
      )}
    </section>
  );
}