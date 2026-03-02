import { api, getAllCountries, getCountryByName } from "@/lib/api";
import { Country } from "@/lib/types";

export default async function Home() {


  const countries: Country []|null = await getCountryByName("Republic")

  console.log(countries)


  return (
    <div>

      <h1>Exporador de Países</h1>


    </div>
  );
}
