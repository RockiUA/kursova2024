import { FC } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton, Text } from 'react-native-paper';
import { NavigationProps } from '@core/interfaces';
import enLocale from '@public/locales/en.json';
import { styles } from './styles';

export const Heading: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const { title } = enLocale.search;

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.close} underlayColor="#DEDEE1" onPress={() => navigation.goBack()}>
        <IconButton icon="close" />
      </TouchableHighlight>

      <Text variant="labelLarge" style={styles.text}>
        {title}
      </Text>
    </View>
  );
};
