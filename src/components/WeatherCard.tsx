import React from "react";
import moment from "moment";

interface WeatherCardProps {
  weather: any;
}

function WeatherCard({ weather }: WeatherCardProps) {
  if (!weather) {
    return null;
  }

  const {
    name,
    main,
    weather: weatherArray,
    wind,
    sys,
    visibility,
    clouds,
  } = weather;
  const { temp, feels_like, humidity, pressure } = main;
  const { description, icon, main: weatherMain } = weatherArray[0];
  const sunriseTime = moment.unix(sys.sunrise).format("h:mm A");
  const sunsetTime = moment.unix(sys.sunset).format("h:mm A");

  const currentTime = moment().unix();
  const isDay = currentTime >= sys.sunrise && currentTime <= sys.sunset;

  const getWeatherIcon = (main: string) => {
    if (main === "Clear") {
      if (isDay) {
        return (
          <svg
            className="w-16 h-16 text-weather-sun"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Clear Day</title>
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        );
      } else {
        return (
          <svg
            className="w-16 h-16 text-slate-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Clear Night</title>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        );
      }
    }

    const iconMap = {
      Clouds: (
        <svg
          className="w-16 h-16 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Cloud</title>
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>
      ),
      Rain: (
        <svg
          className="w-16 h-16 text-blue-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Rain</title>
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
          <path d="M16 14v6"></path>
          <path d="M12 16v6"></path>
          <path d="M8 14v6"></path>
        </svg>
      ),
      Drizzle: (
        <svg
          className="w-16 h-16 text-blue-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Partly Cloudy Day</title>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <path d="M12 2v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="M20 12h2" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M12 12a3 3 0 0 0 3-3 3 3 0 0 0-3-3V2" />
        </svg>
      ),
    };
    return iconMap[main] || iconMap["Clouds"];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="weather-card mb-6">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold gradient-text mb-2">{name}</h2>
          <p className="text-xl text-muted-foreground capitalize">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="ml-4">{getWeatherIcon(weatherMain)}</div>
            </div>
            <div className="text-6xl font-bold mb-2">{Math.round(temp)}°C</div>
            <p className="text-xl text-muted-foreground">
              Feels like {Math.round(feels_like)}°C
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl bg-card/50">
              <div className="flex justify-center mb-1">
                <svg
                  className="w-6 h-6 text-weather-humidity"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Humidity</title>
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path>
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-lg font-semibold">{humidity}%</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card/50">
              <div className="flex justify-center mb-1">
                <svg
                  className="w-6 h-6 text-weather-wind"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Wind</title>
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="text-lg font-semibold">{wind.speed} m/s</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card/50">
              <div className="flex justify-center mb-1">
                <svg
                  className="w-6 h-6 text-weather-pressure"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Pressure</title>
                  <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0"></path>
                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                  <path d="M12 15l0 6"></path>
                  <path d="M9 12l-6 0"></path>
                  <path d="M15 12l6 0"></path>
                  <path d="M12 9l0 -6"></path>
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Pressure</p>
              <p className="text-lg font-semibold">{pressure} hPa</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card/50">
              <div className="flex justify-center mb-1">
                <svg
                  className="w-6 h-6 text-weather-visibility"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <title>Visibility</title>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Visibility</p>
              <p className="text-lg font-semibold">{visibility / 1000} km</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="weather-card">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-weather-sun"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Sun Times</title>
              <circle cx="12" cy="12" r="3.5"></circle>
              <path d="M12 5V3"></path>
              <path d="M12 21v-2"></path>
              <path d="m5.64 5.64-1.42-1.42"></path>
              <path d="m19.78 19.78-1.42-1.42"></path>
              <path d="M5 12H3"></path>
              <path d="M21 12h-2"></path>
              <path d="m5.64 18.36-1.42 1.42"></path>
              <path d="m19.78 4.22-1.42 1.42"></path>
              <path d="M3 18h18"></path>
            </svg>
            Sun Times
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Sunrise</span>
              <span className="font-semibold">{sunriseTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Sunset</span>
              <span className="font-semibold">{sunsetTime}</span>
            </div>
          </div>
        </div>

        <div className="weather-card">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Atmosphere</title>
              <circle cx="50" cy="50" r="45" fill="#a7c5eb" />

              <circle cx="50" cy="50" r="35" fill="#8da9c4" />

              <circle cx="50" cy="50" r="25" fill="#6f8fa9" />

              <path
                d="M 75 25 L 76.5 28 L 80 28.5 L 77.5 31 L 78 34 L 75 32.5 L 72 34 L 72.5 31 L 70 28.5 L 73.5 28 Z"
                fill="#ffffff"
              />
            </svg>
            Atmosphere
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Cloud Cover</span>
              <span className="font-semibold">{clouds.all}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">UV Index</span>
              <span className="font-semibold">Moderate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
