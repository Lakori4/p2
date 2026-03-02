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
    <div>

      <h1>Explorador de Países</h1>
      
      <input 
        type="text" 
        placeholder="Buscar un país..." 
        value={busqueda} 
        onChange={(e) => setBusqueda(e.target.value)} 
      />

      <div>
        
        {loading ? (
          <p>Cargando países...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : filter?.length === 0 ? (
          <p>No se encontraron resultados.</p>
        ) : (
          filter?.map((country)=>(
            <CountryCard key={country.name.common} country={country}></CountryCard>
          ))
        )}
      </div>

    </div>
  );
}

