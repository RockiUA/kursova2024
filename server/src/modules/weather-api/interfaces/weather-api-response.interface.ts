interface Weather {
  date: string;
  temperature: number;
  temperatureFeelsLike: number;
  weather: string;
  weatherDescription: string;
  weatherIcon: string;
  windSpeed: number;
  humidity: number;
  pressure: number;
}

interface City {
  id: number;
  cityName: string;
  cityCoordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface WeatherApiCurrent {
  createdAt: string;
  weather: Weather;
  city: City;
}

export interface WeatherApiForecast {
  createdAt: string;
  forecasts: Weather[];
  city: City;
}
