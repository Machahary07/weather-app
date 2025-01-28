// In your weather.ts file
import OpenWeatherMapAPI from "npm:openweathermap-api-client";

const apiKey = Deno.env.get("OWM_API_KEY");
const units = "metric";

export const handler = async (req: Request) => {
  const url = new URL(req.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  const city = url.searchParams.get("city");

  try {
    const current = await OpenWeatherMapAPI.getCurrentWeather({ apiKey, city, units });
    const forecast = await OpenWeatherMapAPI.getDailyForecast({ apiKey, city, units, cnt: 7 });
    return new Response(
      JSON.stringify({
        current: {
          temp: current.main.temp,
          description: current.weather[0].description,
          icon: current.weather[0].icon,
          name: current.name
        },
        forecast: forecast.list
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch weather data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};