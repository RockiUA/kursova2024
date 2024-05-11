import { FC, memo } from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { useReactiveVar } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { useMessage } from '@hooks/common/use-message';
import { message } from '@lib/apollo/apollo-constants';
import { messages } from './constants';
import { MessageType } from './interfaces';
import { styles } from './styles';

interface MessageProps extends ViewProps {
  type: `${MessageType}`;
}

export const Message: FC<MessageProps> = memo(({ style, type }) => {
  const isFocused = useIsFocused();
  const messageVar = useReactiveVar(message);
  const { clearMessage, clearMessageOnTimeout } = useMessage();
  const { title, style: defaultStyle, icon } = messages[type];

  if (messageVar && isFocused) {
    clearMessageOnTimeout(2000);

    return (
      <TouchableOpacity activeOpacity={0.9} style={[defaultStyle, style]} onPress={clearMessage}>
        {icon}

        <View>
          <Text style={styles.text} variant="titleMedium">
            {title}
          </Text>
          <Text style={styles.text} variant="bodyLarge">
            {messageVar}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
});
