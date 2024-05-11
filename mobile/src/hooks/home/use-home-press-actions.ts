import { useLogout } from '@hooks/auth/use-logout';

interface UseHomePressActionsProps {
  closeMenu: () => void;
}

export const useHomePressActions = ({ closeMenu }: UseHomePressActionsProps) => {
  const { isLogoutPerforming, logout } = useLogout();

  const onLogoutClick = () => {
    closeMenu();
    logout();
  };

  return {
    isLogoutPerforming,
    onLogoutClick,
  };
};
