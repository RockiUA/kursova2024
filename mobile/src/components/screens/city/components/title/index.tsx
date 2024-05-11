import { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';

interface TitleProps {
  children: string | string[];
  style?: StyleProp<TextStyle>;
}

export const Title: FC<TitleProps> = ({ children, style }) => {
  return (
    <Text variant="bodyLarge" style={[styles.title, style]}>
      {children}
    </Text>
  );
};
