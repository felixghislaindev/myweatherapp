import React, { useEffect, useState } from "react";
import axios from "axios";
import { roundTemperature } from "../utils/helpers";
import { CurrentWeatherData } from "../types";

const CurrentWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<CurrentWeatherData | null>(
    null
  );
  const [cityName, setCityName] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const weatherApiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

        const reverseGeoCodeApiKey = process.env.REACT_APP_GEOLOCATION_API_KEY;
        try {
          const reverseGeoCodeResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${reverseGeoCodeApiKey}`
          );

          if (reverseGeoCodeResponse.data.results.length > 0) {
            const city = reverseGeoCodeResponse.data.results[0].components.city;
            setCityName(city);
          }

          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`
          );

          const roundedTemp = roundTemperature(weatherResponse.data.main.temp);
          weatherResponse.data.main.temp = roundedTemp;
          setWeatherData(weatherResponse.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  return (
    <div className="p-4 text-center">
      <div className="container mx-auto">
        {weatherData && cityName ? (
          <div>
            <h2 className="text-xl font-bold">
              Current Weather in {cityName}, UK
            </h2>
            <p className="text-2xl">{weatherData.main.temp}°C</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;
