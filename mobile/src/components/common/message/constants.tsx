import { Image } from 'react-native';
import check from '@public/assets/message/check-circle.png';
import info from '@public/assets/message/info-circle.png';
import warning from '@public/assets/message/warning-circle.png';
import { Messages, MessageType } from './interfaces';
import { styles } from './styles';

export const messages: Messages = {
  [MessageType.SUCCESS]: {
    title: 'Success',
    style: [styles.card, styles.success],
    icon: <Image source={check} style={styles.icon} />,
  },
  [MessageType.WARNING]: {
    title: 'Warning',
    style: [styles.card, styles.warning],
    icon: <Image source={warning} style={styles.icon} />,
  },
  [MessageType.ERROR]: {
    title: 'Error',
    style: [styles.card, styles.error],
    icon: <Image source={warning} style={styles.icon} />,
  },
  [MessageType.INFO]: {
    title: 'Info',
    style: [styles.card, styles.info],
    icon: <Image source={info} style={styles.icon} />,
  },
};
