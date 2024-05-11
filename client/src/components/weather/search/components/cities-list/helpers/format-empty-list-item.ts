import enLocale from '@public/locales/en.json';

export function formatEmptyListItem(loadingState: boolean): string {
  const { loading, notFound } = enLocale.home.search;
  return loadingState ? loading : notFound;
}
