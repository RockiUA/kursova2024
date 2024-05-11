import { FC } from 'react';
import { RefreshControl, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Message } from '@components/common/message';
import { useFetchCurrentWeather } from '@hooks/weather/use-fetch-current-weather';
import enLocale from '@public/locales/en.json';
import { AddButton, MemoizedCityCard } from './components';
import { RightActions } from './components/city-card/components';
import { styles } from './styles';

export const HomeScreen: FC = () => {
  const { empty } = enLocale.home;
  const { isFetchingCurrentPerforming, fetchCurrent, weather } = useFetchCurrentWeather();

  return (
    <>
      <SwipeListView
        data={weather}
        keyExtractor={(item) => item.city.id}
        renderItem={({ item }) => <MemoizedCityCard item={item} />}
        renderHiddenItem={({ item }) => <RightActions item={item} />}
        contentContainerStyle={[styles.container, !weather?.length && styles.emptyContainer]}
        disableRightSwipe={true}
        rightOpenValue={-60}
        refreshControl={<RefreshControl refreshing={isFetchingCurrentPerforming} onRefresh={fetchCurrent} />}
        style={styles.list}
        ListEmptyComponent={
          <Text variant="titleLarge" style={styles.empty}>
            {empty}
          </Text>
        }
      />
      <AddButton />
      <Message type="error" />
    </>
  );
};
