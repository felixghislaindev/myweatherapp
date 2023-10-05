import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import CurrentWeather from "./components/CurrentWeather";
import axios from "axios";
import { FormattedWeatherData, WeatherApiResponse } from "./types";
import { format } from "date-fns";
import { roundTemperature } from "./utils/helpers";

function App() {
  const [weatherData, setWeatherData] = useState<FormattedWeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const formatWeatherDate = (dt_txt: string) => {
    const date = new Date(dt_txt);
    return format(date, "EEEE h:mm a");
  };

  const handleWeatherSearch = async (cityName: string) => {
    try {
      setIsLoading(true);
      const weatherApiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=5&appid=${weatherApiKey}`;
      const weatherResponse = await axios.get(weatherUrl);
      const res: WeatherApiResponse = weatherResponse.data;
      const formattedWeatherData = res.list.map((weatherItem) => ({
        date: formatWeatherDate(weatherItem.dt_txt),
        temperature: roundTemperature(weatherItem.main.temp),
        weatherIconUrl: `https://openweathermap.org/img/w/${weatherItem.weather[0].icon}.png`,
      }));
      setWeatherData(formattedWeatherData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <SearchBar handleWeatherSearch={handleWeatherSearch} />
      <CurrentWeather />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="px-4 sm:px-8">
          {weatherData.length > 0 && (
            <span className="font-semibold">3 hour forecast data</span>
          )}
          <div className="flex flex-wrap justify-center mt-4 space-x-2">
            {weatherData.map((weatherItem) => (
              <div
                key={weatherItem.date}
                className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              >
                <WeatherCard
                  date={weatherItem.date}
                  temperature={weatherItem.temperature}
                  weatherIconUrl={weatherItem.weatherIconUrl}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
