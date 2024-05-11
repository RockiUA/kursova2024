import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
import { Messages, MessageType } from '../interfaces';

export const messages: Messages = {
  [MessageType.SUCCESS]: { title: 'Success', color: 'success', icon: <CheckCircleIcon /> },
  [MessageType.WARNING]: { title: 'Warning', color: 'warning', icon: <WarningIcon /> },
  [MessageType.ERROR]: { title: 'Error', color: 'danger', icon: <ReportIcon /> },
  [MessageType.INFO]: { title: 'Info', color: 'info', icon: <InfoIcon /> },
};
