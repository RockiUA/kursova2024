import { ColorPaletteProp } from '@mui/joy';
import { MessageType } from './message-type.enum';

export interface MessageElement {
  title: string;
  color: ColorPaletteProp;
  icon: JSX.Element;
}

export type Messages = Record<MessageType, MessageElement>;
