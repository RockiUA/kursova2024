import { ActivityIndicator, Text } from 'react-native-paper';
import { styles } from '../item/styles';

export function formatEmptyList(loadingState: boolean): JSX.Element {
  return loadingState ? (
    <ActivityIndicator animating={true} color="#096BDE" />
  ) : (
    <Text variant="bodyLarge" style={[styles.text, { padding: 15 }]}>
      Nothing was found.
    </Text>
  );
}
