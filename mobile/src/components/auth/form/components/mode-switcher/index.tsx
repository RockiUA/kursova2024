import React, { FC } from 'react';
import { View } from 'react-native';
import { Link } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { modeSwitcherVariants } from './constants';
import { styles } from './styles';
import { AuthType } from '../../interfaces';

interface ModeSwitcherProps {
  type: `${AuthType}`;
}

export const ModeSwitcher: FC<ModeSwitcherProps> = ({ type }) => {
  const { text, screen, linkText } = modeSwitcherVariants[type];

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium">{text}</Text>

      <Link to={{ screen }}>
        <Text variant="bodyMedium" style={styles.link}>
          {linkText}
        </Text>
      </Link>
    </View>
  );
};
