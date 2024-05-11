import { FC } from 'react';
import { View } from 'react-native';
import { CurrentWeather } from '@generated';
import { IconButton } from 'react-native-paper';
import { useDeleteUserCities } from '@hooks/weather/use-delete-user-cities';
import { styles } from './styles';

interface RightActionsProps {
  item: CurrentWeather;
}

export const RightActions: FC<RightActionsProps> = ({ item }) => {
  const { isDeletePerforming, deleteUserCities } = useDeleteUserCities();

  return (
    <View style={styles.container}>
      <IconButton disabled={isDeletePerforming} icon="delete" iconColor="red" onPress={() => deleteUserCities(item)} />
    </View>
  );
};
