import { useState, useCallback } from 'react';
import { fetchWeatherData } from '../utils/api';

export const useWeather = (location?: string, latitude?: number | null, longitude?: number | null) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (newLocation?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let data;
      if (newLocation) {
        data = await fetchWeatherData(newLocation);
      } else if (latitude && longitude) {
        data = await fetchWeatherData(undefined, latitude, longitude);
      } else {
        throw new Error("Location or coordinates are required.");
      }

      setWeatherData(data);
    } catch (err: any) {
      setError(err.message || 'Could not fetch weather data.');
    } finally {
      setIsLoading(false);
    }
  }, [location, latitude, longitude]);

  return { weatherData, isLoading, error, fetchWeather };
};