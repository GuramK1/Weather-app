import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ThemeSwitcher from '../components/ThemeSwitcher';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { useGeolocation } from '../hooks/useGeolocation';
import { useTheme } from '../hooks/useTheme';
import { useWeather } from '../hooks/useWeather';

const Index = () => {
  const [location, setLocation] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { latitude, longitude, error: geoError } = useGeolocation();
  const { weatherData, isLoading, error: weatherError, fetchWeather } = useWeather(location, latitude, longitude);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude, fetchWeather]);

  const handleSearch = (newLocation: string) => {
    setLocation(newLocation);
    fetchWeather(newLocation);
  };

  const handleRetry = () => {
    if (location) {
      fetchWeather(location);
    } else if (latitude && longitude) {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <BackgroundAnimation theme={theme} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        
        <div className="flex-1 flex flex-col justify-center px-4 py-8">
          <div className="max-w-6xl mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="gradient-text">Weather</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Get real-time weather information for any city around the world
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {/* Weather Content */}
            <div className="mt-8">
              {isLoading && <LoadingSpinner />}
              
              {weatherError && (
                <ErrorMessage error={weatherError} onRetry={handleRetry} />
              )}
              
              {geoError && !weatherData && !isLoading && (
                <div className="weather-card max-w-md mx-auto text-center">
                  <div className="text-4xl mb-4">📍</div>
                  <p className="text-muted-foreground mb-4">
                    Unable to get your location. Please search for a city manually.
                  </p>
                  <p className="text-sm text-muted-foreground">{geoError}</p>
                </div>
              )}
              
              {weatherData && <WeatherCard weather={weatherData} />}
              
              {!weatherData && !isLoading && !weatherError && !geoError && (
                <div className="weather-card max-w-md mx-auto text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <h3 className="text-xl font-semibold mb-2">Welcome to Weather App</h3>
                  <p className="text-muted-foreground">
                    Search for any city to get started with real-time weather information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-muted-foreground">
          <p className="text-sm">
            Powered by OpenWeatherMap API • Built with React & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
