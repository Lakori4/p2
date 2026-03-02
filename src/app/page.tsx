"use client"
import CountryCard from "@/components/CountryCard";
import { getAllCountries } from "@/lib/api";
import { Country } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {

  const [countries, setCountries] = useState<Country[]|null>(null);
  const [busqueda, setBusqueda] = useState("")

  useEffect(()=>{
    getAllCountries().then((data)=>{
      setCountries(data)
    })
  }, []); // <--- El arreglo vacío evita un bucle infinito

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
        {!countries ? (
          <p>Cargando países...</p>
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
