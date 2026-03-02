"use client"
import CountryCard from "@/components/CountryCard";
import { getAllCountries } from "@/lib/api";
import { Country } from "@/lib/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [countries, setCountries] = useState<Country[]|null>(null);
  const [busqueda, setBusqueda] = useState("")
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(()=>{
    getAllCountries().then((data)=>{
      setCountries(data)
    }).catch((e:AxiosError)=>{
            setError(e.message)
        }).finally(()=>{
            setLoading(false);
        })
  }, []); 

 const filter = countries?.filter((country)=>(country.name.common.toLowerCase().includes(busqueda.toLowerCase())))

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
        ) : filter?.length === 0 ? (
          <p className="noResults">No se encontraron resultados.</p>
        ) : (
          filter?.map((country)=>(
            <CountryCard key={country.name.common} country={country}></CountryCard>
          ))
        )}
      </div>

    </div>
  );
}

