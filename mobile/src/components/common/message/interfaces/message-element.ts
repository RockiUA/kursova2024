import { StyleProp, ViewStyle } from 'react-native';
import { MessageType } from './message-type';

export interface MessageElement {
  title: string;
  style: StyleProp<ViewStyle>;
  icon: JSX.Element;
}

export type Messages = Record<MessageType, MessageElement>;
