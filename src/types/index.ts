export interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];

  dt_txt: string;
}
export interface CurrentWeatherData {
  main: {
    temp: number;
  };
  name: string;
}

export interface FormattedWeatherData {
  date: string;
  temperature: number;
  weatherIconUrl: string;
}

export interface WeatherApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
