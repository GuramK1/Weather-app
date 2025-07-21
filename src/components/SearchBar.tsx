import React, { useState, useEffect, useRef } from 'react';
import { searchCities, CityResult } from '@/utils/api';
import { MapPin, Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<CityResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchCitiesAsync = async () => {
      if (searchTerm.length >= 2) {
        setIsSearching(true);
        const results = await searchCities(searchTerm);
        setCities(results);
        setShowDropdown(true);
        setIsSearching(false);
      } else {
        setCities([]);
        setShowDropdown(false);
      }
    };

    const timeoutId = setTimeout(searchCitiesAsync, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setShowDropdown(false);
    }
  };

  const handleCitySelect = (city: CityResult) => {
    const cityName = city.state ? `${city.name}, ${city.state}, ${city.country}` : `${city.name}, ${city.country}`;
    setSearchTerm(cityName);
    setShowDropdown(false);
    onSearch(cityName);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCities([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for any city..."
            value={searchTerm}
            onChange={handleChange}
            className="weather-search placeholder:text-muted-foreground pr-20"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading || !searchTerm.trim()}
              className="weather-btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {showDropdown && (cities.length > 0 || isSearching) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {isSearching ? (
              <div className="flex items-center justify-center py-4">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">Searching cities...</span>
              </div>
            ) : (
              cities.map((city, index) => (
                <button
                  key={`${city.name}-${city.country}-${index}`}
                  type="button"
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center gap-3 border-b border-border last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {city.name}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {city.state ? `${city.state}, ${city.country}` : city.country}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </form>
  );
}

export default SearchBar;