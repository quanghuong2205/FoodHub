import Button from '@/shared/button';
import headerStyles from '../header.module.scss';
import { Flex } from 'antd';
import { AuthModeType, useAuthModalStore } from '@/zustand/auth-modal.store';

function AuthButtons() {
  const { setAuthMode, open } = useAuthModalStore();

  /* Handle open auth modal  */
  const handleOpenAuthModal = (mode: AuthModeType) => () => {
    setAuthMode(mode);
    open();
  };
  return (
    <Flex
      gap={15}
      className={headerStyles.ctrls}>
      <Button
        title='Đăng ký'
        variant='outline'
        onClick={handleOpenAuthModal('sign-up')}
      />

      <Button
        title='Đăng nhập'
        variant='primary'
        onClick={handleOpenAuthModal('sign-in')}
      />
    </Flex>
  );
}

export default AuthButtons;
