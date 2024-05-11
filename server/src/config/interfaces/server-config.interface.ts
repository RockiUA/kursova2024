export enum WeatherApiProvider {
  OPEN_WEATHER = 'openweather',
}

export enum SortOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}
export interface ServerConfig {
  allowedOrigins: string[];
  maximumCitiesAllowed: number;
  forecastExpire: number;
  currentWeatherExpire: number;
  jwtTokens: {
    accessTokenSecret: string;
    refreshTokenSecret: string;
    accessTokenExpire: number;
    refreshTokenExpire: number;
    accessTokenCookieName: string;
    refreshTokenCookieName: string;
    hashingSalt: number;
  };
  multipleRowsRequest: {
    sortOptions: {
      order: SortOptions;
    };
    limit: number;
    offset: number;
  };
  weatherAPI: {
    provider: WeatherApiProvider;
    forecastDays: number;
    forecastDaysMaximum: number;
  };
  openWeather: {
    apiKey: string;
    forecastDayTime: string;
    url: string;
    imageUrl: string;
    imageSize: string;
    imageExtension: string;
  };
  logger: {
    loggingPath: string;
    transport: {
      datePattern: string;
      maxSize: string;
      maxFiles: string;
    };
  };
}
