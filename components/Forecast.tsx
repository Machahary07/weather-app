interface ForecastDay {
    dt: number;
    temp: {
      day: number;
      night: number;
    };
    weather: [{
      description: string;
      icon: string;
    }];
  }
  
  interface ForecastProps {
    data?: ForecastDay[];
  }
  
  export default function Forecast({ data }: ForecastProps) {
    if (!data) return null;
  
    return (
      <section class="weather-card">
        <h2 class="weather-card__title">7-Day Forecast</h2>
        
        <div class="forecast-grid">
          {data.slice(0, 7).map((day) => (
            <div key={day.dt} class="forecast-day">
              <p class="forecast-date">
                {new Date(day.dt * 1000).toLocaleDateString([], {
                  weekday: 'short',
                  day: 'numeric'
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
              />
              <div class="forecast-temps">
                <span class="day-temp">{Math.round(day.temp.day)}°</span>
                <span class="night-temp">{Math.round(day.temp.night)}°</span>
              </div>
              <p class="forecast-desc">{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }