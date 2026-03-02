import { Country } from "@/lib/types";

interface CountryDetailProps {
  country: Country;
}



export default function CountryDetail({ country }: CountryDetailProps) {
 
  const idiomas: Record <string, string> = country.languages

  console.log(idiomas)
 
  return (
    <div className="countryDetail">
      <img
        src={country.flags.svg}
        alt={country.flags.alt || `Bandera de ${country.name.common}`}
        className="detailFlag"
      />
      <p className="detailOfficial"> Nombre oficial:{country.name.official}</p>
      <p>Capital: {country.capital}</p>
      <p>Región: {country.region}</p>
      <p>Población: {country.population.toLocaleString("es-ES")}</p>
      <p>Idiomas: </p>
      <p>{Object.entries(idiomas).map(([sym, lang]) => (<div key={sym}><ul>{lang}</ul></div>) )}</p>
    </div>
  )
}
