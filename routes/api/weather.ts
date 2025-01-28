import { HandlerContext } from "$fresh/server.ts";

export const handler = async (req: Request, ctx: HandlerContext): Promise<Response> => {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    
    // Get parameters from request
    const lat = params.get("lat");
    const lon = params.get("lon");
    const location = params.get("location");
    const forecast = params.has("forecast");

    const API_KEY = Deno.env.get("OWM_API_KEY");
    
    // Build API URL based on parameters
    let apiUrl = "";
    
    if (lat && lon) {
      apiUrl = forecast
        ? `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    } else if (location) {
      // First get coordinates for location
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
      );
      const [geoData] = await geoResponse.json();
      
      if (!geoData) return new Response("Location not found", { status: 404 });
      
      apiUrl = forecast
        ? `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${geoData.lat}&lon=${geoData.lon}&cnt=7&units=metric&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=metric&appid=${API_KEY}`;
    }

    const weatherResponse = await fetch(apiUrl);
    const weatherData = await weatherResponse.json();
    
    return new Response(JSON.stringify(weatherData), {
      headers: { "Content-Type": "application/json" },
    });
    
  } catch (error) {
    return new Response("Error fetching weather data", { status: 500 });
  }
};