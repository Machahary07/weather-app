import { PageProps } from "$fresh/server.ts";
import SearchForm from "../islands/SearchForm.tsx";
import Geolocation from "../islands/Geolocation.tsx";
import Forecast from "../components/Forecast.tsx";

export default function Home({ data }) {
  return (
    <main class="container">
      <Geolocation />
      <SearchForm />
      <Forecast data={data.forecast} />
    </main>
  );
}