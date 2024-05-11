import { makeVar } from '@apollo/client';

export const authenticated = makeVar<boolean | null>(null);
export const message = makeVar<string>('');
export const userCitiesIds = makeVar<string[]>([]);
