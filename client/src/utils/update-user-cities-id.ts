import { FetchCurrentWeatherByUserQuery } from '@generated';
import { userCitiesIds } from '@lib/apollo/apollo-constants';

export function updateUserCitiesId(data?: FetchCurrentWeatherByUserQuery): void {
  const ids = [] as string[];
  data?.weather?.forEach((item) => item && ids.push(item.city.id));
  userCitiesIds(ids);
}
