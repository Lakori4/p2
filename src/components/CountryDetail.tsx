import { Country } from "@/lib/types";

interface CountryDetailProps {
  country: Country;
}



export default function CountryDetail({ country }: CountryDetailProps) {
  const idiomas: Record<string, string> = country.languages;
 
  return (
    <div className="countryDetail">
      <img
        src={country.flags.svg}
        alt={country.flags.alt || `Bandera de ${country.name.common}`}
        className="detailFlag"
      />
      <div className="detailBody">
        <p className="detailOfficial">Nombre oficial: {country.name.official}</p>
        <p className="detailRow">Capital: {country.capital?.join(", ") || "N/A"}</p>
        <p className="detailRow">Región: {country.region}</p>
        <p className="detailRow">Población: {country.population.toLocaleString("es-ES")}</p>
        <div className="detailRow">
          <span className="detailLabel">Idiomas:</span>
          <ul className="detailLanguages">
            {Object.entries(idiomas).map(([sym, lang]) => (
              <li key={sym}>{lang}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
