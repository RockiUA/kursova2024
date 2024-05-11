import { FC } from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { cardVariants } from './constants';
import { Card as CardTitle } from './enums';
import { styles } from './styles';

interface CardProps {
  title: `${CardTitle}`;
  info: number | string;
}

export const Card: FC<CardProps> = ({ title, info }) => {
  const { icon, text, suffix } = cardVariants[title];

  return (
    <View style={styles.container}>
      <IconButton icon={icon} style={styles.icon} />

      <Text variant="bodyLarge" style={styles.text}>
        {text}
      </Text>

      <View style={styles.info}>
        <Text variant="headlineMedium">{info}</Text>
        <Text variant="bodyLarge">{suffix}</Text>
      </View>
    </View>
  );
};
