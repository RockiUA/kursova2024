export interface OpenWeatherFetcherConfigs {
  endpoint: Endpoint;
  units: Units;
}

export enum Endpoint {
  FORECAST = 'forecast',
  WEATHER = 'weather',
}

export enum Units {
  STANDARD = 'standard',
  METRIC = 'metric',
  IMPERIAL = 'imperial',
}

// Interfaces for typing OpenWeather response:
interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  '1h'?: number;
  '3h'?: number;
}

interface Sys {
  pod: string;
}

interface Coord {
  lat: number;
  lon: number;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

export interface OpenWeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface OpenWeatherCurrentResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Omit<Main, 'temp_kf'>;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface OpenWeatherMappedForecast {
  list: List[];
  city: City;
}
