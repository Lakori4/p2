'use client';
import { getCountryByName } from "@/lib/api";
import CountryDetail from "@/components/CountryDetail";
import { Country } from "@/lib/types";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



const CountryDetailPage = () => {

    const { name } = useParams();
    console.log(name)

    const countryName = Array.isArray(name) ? name.join("") : name;

    const [country, setCountry] = useState<Country|null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        if (!countryName) {
            setLoading(false);
            setError("No se encontró el parámetro en la URL.");
            return;
        }

        getCountryByName(countryName).then((res)=>{
            setCountry(res);
        }).catch((e:AxiosError)=>{
            setError(e.message)
        }).finally(()=>{
            setLoading(false);
        })
    },[countryName]);

    return(
        <div className="main">
            <h1 className="title">Detalle del país: {country?.name.common}</h1>

            {!country && loading && <h2 className="loading">Loading...</h2>}

            {country && <CountryDetail country={country} />}
            {error && <h2 className="error">{error}</h2>}
        </div>
    )

};


export default CountryDetailPage;