'use client';
import Modal from '@/shared/modal';
import authModalStyles from './auth-modal.module.scss';
import SignInForm from './_components/sign-in';
import SignUpForm from './_components/sign-up';
import { useAuthModalStore } from '@/zustand/auth-modal.store';

function AuthModal() {
  /* Modal state */
  const { isOpen, close, authMode, switchAuthMode } = useAuthModalStore();
  const isSignIn = authMode === 'sign-in';

  return (
    <Modal
      title=''
      isOpen={isOpen}
      onClose={close}>
      <div className={authModalStyles.wrapper}>
        <header className={authModalStyles.header}>
          <h3 className={authModalStyles.title}>{isSignIn ? 'Đăng nhập' : 'Đăng ký'}</h3>
          <p className={authModalStyles.desc}>
            Bạn đang thực hiện {isSignIn ? 'đăng nhập' : 'đăng ký'}
          </p>
        </header>

        {isSignIn ? (
          <SignInForm onCloseModal={close} />
        ) : (
          <SignUpForm handleSwitchAuthMode={switchAuthMode} />
        )}

        <footer className={authModalStyles['footer']}>
          <p>
            {' '}
            {!isSignIn ? 'Bạn đã có tài khoản?' : 'Bạn chưa có tài khoản?'}
            <button
              onClick={switchAuthMode}
              className={authModalStyles['form-link']}>
              {isSignIn ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </p>
        </footer>
      </div>
    </Modal>
  );
}

export default AuthModal;
