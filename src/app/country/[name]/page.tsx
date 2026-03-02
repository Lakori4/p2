'use client';
import { getCountryByName } from "@/lib/api";
import { Country } from "@/lib/types";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



const EstaRecibeId = () => {

    const { id } = useParams();

    const [country, setCountry] = useState<Country|null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        getCountryByName(id as string).then((res)=>{
            setCountry(res);
        }).catch((e:AxiosError)=>{
            setError(e.message)
        }).finally(()=>{
            setLoading(false);
        })
    },[id]);

    return(
        <div>
            <h1>Esta es la que recibe el id y dicho id es: {id}</h1>
            {!country && loading && <h1>Loading...</h1>}
            {country &&
            (<>
                <img src={country.flags.svg}/>
                <h2>{country.name.common}</h2>
            </>)}
            {error && <h2>{error}</h2>}
        </div>
    )

};


export default EstaRecibeId;