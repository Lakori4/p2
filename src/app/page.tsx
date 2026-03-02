"use client"
import CountryCard from "@/components/CountryCard";
import { getAllCountries, searchCountriesByName } from "@/lib/api";
import { Country } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {

  const [countries, setCountries] = useState<Country[]>([]);
  const [busqueda, setBusqueda] = useState("")
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(()=>{
    let isMounted = true;

    const fetchCountries = async () => {
      setLoading(true);
      setError("");

      try {
        const query = busqueda.trim();
        const data = query
          ? await searchCountriesByName(query)
          : await getAllCountries();

        if (isMounted) {
          setCountries(data);
        }
      } catch (e) {
        if (isMounted) {
          setError(e instanceof Error ? e.message : "Error al buscar países.");
          setCountries([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const timeout = setTimeout(fetchCountries, 350);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [busqueda]);

  return (
    <div className="main">

      <h1 className="title">Explorador de Países</h1>
      
      <div className="searchContainer">
        <input 
          type="text" 
          placeholder="Buscar un país..." 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
          className="searchInput"
        />
      </div>

      <div className="grid">
        
        {loading ? (
          <p className="loading">Cargando países...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : countries.length === 0 ? (
          <p className="noResults">No se encontraron resultados.</p>
        ) : (
          countries.map((country)=>(
            <CountryCard key={country.name.common} country={country}></CountryCard>
          ))
        )}
      </div>

    </div>
  );
}

