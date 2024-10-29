import { useState, useEffect } from 'react';

interface ShippingRates {
    price_per_kg_composition: number;
    price_per_kg_door: number;
    estimated_delivery_days_min: number;
    estimated_delivery_days_max: number;
    base_cost_composition: number;
    base_cost_door: number;
}

interface ShippingData {
    cities: string[];
    startCities: string[];
    endCities: string[];
    rates: ShippingRates | null;
}

export function useShippingData(startCity: string, endCity: string): [ShippingData, string | null] {
    const [cities, setCities] = useState<string[]>([]);
    const [startCities, setStartCities] = useState<string[]>([]);
    const [endCities, setEndCities] = useState<string[]>([]);
    const [rates, setRates] = useState<ShippingRates | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch all cities
    useEffect(() => {
        fetch('/api/cities')
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setStartCities(data);
                setEndCities(data);
            })
            .catch(error => {
                console.error('Failed to fetch cities:', error);
                setError('Failed to load cities. Please try again later.');
            });
    }, []);

    useEffect(() => {
        if (startCity && endCity) {
            fetch(`/api/shipping-rates?startCity=${encodeURIComponent(startCity)}&endCity=${encodeURIComponent(endCity)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setRates(data);
                })
                .catch(error => {
                    console.error('Failed to fetch shipping rates:', error);
                    setError('Failed to load shipping rates. Please try again later.');
                });
        }
    }, [startCity, endCity]);

    return [{ cities, startCities, endCities, rates }, error];
}