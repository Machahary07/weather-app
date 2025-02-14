// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $api_joke from "./routes/api/joke.ts";
import * as $api_weather from "./routes/api/weather.ts";
import * as $index from "./routes/index.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $CurrentWeather from "./islands/CurrentWeather.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/weather.ts": $api_weather,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./islands/CurrentWeather.tsx": $CurrentWeather,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
