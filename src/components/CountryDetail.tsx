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
      <h2 className="detailName">{country.name.common}</h2>
      <p className="detailOfficial">{country.name.official}</p>
      <p>{country.capital}</p>
      <p>{country.region}</p>
      <p>{country.population}</p>
      <p>{Object.entries(idiomas).map(([sym, lang]) => (<div key={sym}>{lang}</div>) )}</p>
    </div>
  )
}
