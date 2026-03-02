import { Country } from "@/lib/types";

interface CountryDetailProps {
  country: Country;
}

export default function CountryDetail({ country }: CountryDetailProps) {
  return (
    <div className="countryDetail">
      <img
        src={country.flags.svg}
        alt={country.flags.alt || `Bandera de ${country.name.common}`}
        className="detailFlag"
      />
      <h2 className="detailName">{country.name.common}</h2>
      <p className="detailOfficial">{country.name.official}</p>
    </div>
  );
}
