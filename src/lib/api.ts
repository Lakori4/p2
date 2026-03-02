import axios from "axios";
import { Country } from "./types";

export const api = axios.create({
    baseURL: "https://restcountries.com/v3.1/",
    timeout: 5000,
});

export const getAllCountries = async (): Promise<Country[]> => {
    try {
        const response = await api.get<Country[]>("/all?fields=name,flags");
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los países:", error);
        return [];
    }
};


export const getCountryByName = async (name: string): Promise<Country | null> => {
    try {
        const response = await api.get<Country[]>(`/name/${name}`);
        // El endpoint /name siempre devuelve un array, así que devolvemos la primera coincidencia
        return response.data[0] || null;
    } catch (error) {
        console.error(`Error al obtener el detalle del país ${name}:`, error);
        return null;
    }
};