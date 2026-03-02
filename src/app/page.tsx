"use client"
import CountryCard from "@/components/CountryCard";
import { getAllCountries, getCountryByName } from "@/lib/api";
import { Country } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {

  const [countries, setCountries] = useState<Country[]|null>(null);
  const [busqueda, setBusqueda]= useState("")

  useEffect(()=>{
    getAllCountries().then((data)=>{
      setCountries(data)
    })
  })

 const filter = countries?.filter((country)=>(country.name.common.toLowerCase().includes(busqueda.toLowerCase())))

  return (
    <div>

      <h1>Explorador de Países</h1>
      
      <div>
        {filter?.map((country)=>(<CountryCard key={country.name.common} country={country}></CountryCard>))}
      </div>



    </div>
  );
}
