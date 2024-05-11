import { City } from '@city/models';
import { CachingPrefixes } from './caching-prefixes';
import { FetchForecastInput } from '../dto';

export interface CachedDataOptions<T> {
  entities: T[];
  prefix: string;
}

export interface FindForecastArgs {
  entities: City[];
  fetchOptions: FetchForecastInput;
}

export interface CheckDateDifferenceArgs<T> {
  cachedValue: T | undefined;
  prefix: CachingPrefixes;
  expire: number;
}
