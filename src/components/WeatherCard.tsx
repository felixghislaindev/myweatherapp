import React from "react";

interface WeatherCardProps {
  date: string;
  temperature: number;
  weatherIconUrl: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  date,
  temperature,
  weatherIconUrl,
}) => {
  return (
    <div className="w-60 h-72 border border-black bg-white p-4 text-black rounded-lg shadow-md">
      <img
        src={weatherIconUrl}
        alt="Weather Icon"
        className="w-16 h-16 md:w-20 md:h-20 mx-auto"
      />
      <div className="text-center mt-2">
        <p className="text-xl font-bold">{date}</p>
        <p className="text-lg">{temperature}°C</p>
      </div>
    </div>
  );
};

export default WeatherCard;
