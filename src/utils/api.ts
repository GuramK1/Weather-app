import axios from 'axios';

const API_KEY = '9927f304b36f7357a2cd4647479589a0';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/direct';

export interface CityResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export const searchCities = async (query: string): Promise<CityResult[]> => {
  try {
    if (!query.trim() || query.length < 2) return [];
    
    const response = await axios.get(`${GEOCODING_URL}?q=${query}&limit=5&appid=${API_KEY}`);
    return response.data;
  } catch (error: any) {
    console.error("Error searching cities:", error);
    return [];
  }
};

export const fetchWeatherData = async (location?: string, latitude?: number, longitude?: number) => {
  try {
    let url = BASE_URL;
    if (typeof location === 'string') {
      url += `?q=${location}&appid=${API_KEY}&units=metric`;
    } else if (latitude && longitude) {
      url += `?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    } else {
      throw new Error("Invalid location or coordinates provided.");
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching weather data:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch weather data");
  }
};
