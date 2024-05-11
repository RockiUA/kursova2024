import { FetchCurrentWeatherByUserQuery } from '@generated';
import { userCitiesIds } from '@lib/apollo/apollo-constants';

/**
 *  Function for passing cities ids into `userCitiesIds` global state.
 *  This helps to determine if the user already had pinned city or not.
 *
 *  @param data - fetched data.
 */
export function updateUserCitiesId(data?: FetchCurrentWeatherByUserQuery): void {
  const ids = [] as string[];
  data?.weather?.forEach((item) => item && ids.push(item.city.id));
  userCitiesIds(ids);
}
