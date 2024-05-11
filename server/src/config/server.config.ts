import { ServerConfig, SortOptions, WeatherApiProvider } from './interfaces';

export const serverConfig: ServerConfig = {
  allowedOrigins: ['http://localhost:3000', 'http://localhost:8081'],
  maximumCitiesAllowed: Number(process.env.MAXIMUM_CITIES_ALLOWED),
  forecastExpire: Number(process.env.FORECAST_EXPIRE),
  currentWeatherExpire: Number(process.env.CURRENT_WEATHER_EXPIRE),
  jwtTokens: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    accessTokenExpire: Number(process.env.JWT_ACCESS_TOKEN_EXPIRE),
    refreshTokenExpire: Number(process.env.JWT_REFRESH_TOKEN_EXPIRE),
    accessTokenCookieName: 'x-access-token',
    refreshTokenCookieName: 'x-refresh-token',
    hashingSalt: 10,
  },
  multipleRowsRequest: {
    sortOptions: {
      order: SortOptions.ASC,
    },
    limit: 10,
    offset: 0,
  },
  weatherAPI: {
    provider: WeatherApiProvider.OPEN_WEATHER,
    forecastDays: Number(process.env.WEATHER_API_FORECAST_DAYS),
    forecastDaysMaximum: Number(process.env.WEATHER_API_FORECAST_DAYS_MAXIMUM),
  },
  openWeather: {
    apiKey: process.env.OPEN_WEATHER_API_KEY,
    forecastDayTime: process.env.OPEN_WEATHER_API_FORECAST_DAYTIME,
    url: process.env.OPEN_WEATHER_API_URL,
    imageUrl: process.env.OPEN_WEATHER_API_IMAGE_URL,
    imageSize: '@2x',
    imageExtension: 'png',
  },
  logger: {
    loggingPath: 'src/logs',
    transport: {
      datePattern: 'YYYY-MM-DD',
      maxSize: '200m',
      maxFiles: '14d',
    },
  },
};
