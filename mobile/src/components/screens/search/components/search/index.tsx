import { FC, useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useSearchCities } from '@hooks/search/use-search-cities';
import enLocale from '@public/locales/en.json';
import { SearchList } from './components';
import { styles } from './styles';

export const Search: FC = () => {
  const [searchPrompt, setSearchPrompt] = useState<string>('');
  const { cities, loading } = useSearchCities(searchPrompt);
  const { placeholder } = enLocale.search.input;

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={setSearchPrompt}
        value={searchPrompt}
        placeholderTextColor="#8F8FA3"
        style={styles.input}
      />

      <SearchList cities={cities} loading={loading} />
    </View>
  );
};
