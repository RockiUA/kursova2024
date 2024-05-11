import { FC } from 'react';
import { View } from 'react-native';
import { useMeQuery } from '@generated';
import { Appbar, Menu, Text } from 'react-native-paper';
import { useHeader } from '@hooks/common/use-header';
import { useHomePressActions } from '@hooks/home/use-home-press-actions';
import enLocale from '@public/locales/en.json';
import { styles } from './styles';

export const HomeHeaderBar: FC = () => {
  const { data } = useMeQuery({ fetchPolicy: 'cache-only' });
  const { visible, toggleVisibility, setInvisible } = useHeader();
  const { isLogoutPerforming, onLogoutClick } = useHomePressActions({ closeMenu: setInvisible });
  const {
    title,
    menu: { logout },
  } = enLocale.home.headerBar;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{title}</Text>
      <Menu
        visible={visible}
        onDismiss={setInvisible}
        anchor={<Appbar.Action icon="dots-vertical" onPress={toggleVisibility} />}
        contentStyle={styles.menuContent}
      >
        <Menu.Item title={data?.me?.email} leadingIcon="account" />
        <Menu.Item disabled={isLogoutPerforming} onPress={onLogoutClick} title={logout.title} leadingIcon="logout" />
      </Menu>
    </View>
  );
};
