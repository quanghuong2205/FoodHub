import Button from '@/shared/button';
import headerStyles from '../header.module.scss';
import { useSignOut } from '@/services/auth.service';
import { useContext, useEffect } from 'react';
import { useUserStore } from '@/zustand/user.store';
import { NotifyContext } from '@/providers/notify.provider';
import { removeFromLocalStorage } from '@/utils/local-storage';
import { TOKEN_KEY } from '@/constant/local-storage.key';

function SignoutButton() {
  const { trigger: requestSignout, isMutating, data } = useSignOut();
  const { setUser } = useUserStore();
  const { sendNotify } = useContext(NotifyContext);

  /* Signout success */
  useEffect(() => {
    if (!data) return;
    setUser(null);
    removeFromLocalStorage(TOKEN_KEY);
    sendNotify('Đăng xuất', 'success', 'Đăng xuất thành công');
  }, [data, setUser, sendNotify]);

  return (
    <Button
      title='Đăng xuất'
      variant='secondary'
      cls={headerStyles.signout}
      isLoading={isMutating}
      onClick={requestSignout}
    />
  );
}

export default SignoutButton;
