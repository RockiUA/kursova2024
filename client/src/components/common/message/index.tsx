import React, { ComponentPropsWithoutRef, FC } from 'react';
import { useReactiveVar } from '@apollo/client';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Alert, IconButton, Typography } from '@mui/joy';
import classNames from 'classnames';
import { useMessage } from '@hooks/common/use-message';
import { message } from '@lib/apollo/apollo-constants';
import { messages } from './constants/messages';
import { MessageType } from './interfaces';
import { MessagePosition } from './interfaces/message-position.enum';
import styles from './message.module.css';

interface MessageProps extends ComponentPropsWithoutRef<'div'> {
  position: `${MessagePosition}`;
  type: `${MessageType}`;
}

export const Message: FC<MessageProps> = ({ position, className, type }) => {
  const { clearMessage } = useMessage();
  const messageVar = useReactiveVar(message);
  const messageInfo = messages[type];

  return (
    <>
      {messageVar && (
        <Alert
          key={messageInfo.title}
          className={classNames(className, {
            [styles.fixed]: position === MessagePosition.FIXED,
            [styles.block]: position === MessagePosition.BLOCK,
          })}
          startDecorator={React.cloneElement(messageInfo.icon, {
            className: styles.errorIcon,
          })}
          variant="soft"
          color={messageInfo.color}
          endDecorator={
            <IconButton variant="soft" size="sm" color={messageInfo.color} onClick={clearMessage}>
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <Typography fontWeight="lg" mt={0.25}>
              {messageInfo.title}
            </Typography>
            <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
              {messageVar}
            </Typography>
          </div>
        </Alert>
      )}
    </>
  );
};
