import Link from "next/link";
import Image from "next/image";
import { Country } from "@/lib/types";
import styles from "./CountryCard.module.css";

interface Props {
  country: Country;
}

export default function CountryCard({ country }: Props) {
  return (
    <Link href={`/country/${country.name.common.toLowerCase()}`} className="card">
      <div className="imageWrapper">
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          className="flag"
        />
      </div>
      <div className="content">
        <h2 className="title">{country.name.common}</h2>
      </div>
    </Link>
  );
}
