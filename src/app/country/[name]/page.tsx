'use client';
import { getCountryByName } from "@/lib/api";
import { Country } from "@/lib/types";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



const CountryDetailPage = () => {

    const { name } = useParams();
    const countryName = Array.isArray(name) ? name[0] : name;

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
            <h1 className="title">Detalle del país: {countryName}</h1>
            {!country && loading && <h2 className="loading">Loading...</h2>}
            {country &&
            (<>
                <img src={country.flags.svg}/>
                <h2>{country.name.common}</h2>
            </>)}
            {error && <h2 className="error">{error}</h2>}
        </div>
    )

};


export default CountryDetailPage;