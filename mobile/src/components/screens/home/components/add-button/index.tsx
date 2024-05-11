import { FC } from 'react';
import { TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { NavigationProps } from '@core/interfaces';
import { styles } from './styles';

export const AddButton: FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableHighlight style={styles.button} underlayColor="#ADDBFF" onPress={() => navigation.navigate('Search')}>
      <IconButton icon="plus" size={30} />
    </TouchableHighlight>
  );
};
