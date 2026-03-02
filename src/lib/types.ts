export interface Country {
    name: {
        common: string;
        official: string;
    };
    flags: {
        svg: string;
        alt?: string;
    };
    capital?: string[];
    region: string;
    population: number;
    languages?: Record<string, string>;
}
