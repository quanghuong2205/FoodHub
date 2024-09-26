import authModalStyles from '../auth-modal.module.scss';
import { useForm } from 'react-hook-form';
import Button from '@/shared/button';
import { signInResolver } from '../validation-rules';
import { ISignInApiArgs, useSignIn } from '@/services/auth.service';
import { useUserStore } from '@/zustand/user.store';
import { saveToLocalStorage } from '@/utils/local-storage';
import { TOKEN_KEY } from '@/constant/local-storage.key';
import { useContext, useEffect } from 'react';
import { NotifyContext } from '@/providers/notify.provider';

interface ISignInFormProps {
  onCloseModal: () => void;
}

function SignInForm({ onCloseModal }: ISignInFormProps) {
  /* Send notify */
  const { sendNotify } = useContext(NotifyContext);

  /* User store */
  const { setUser } = useUserStore();

  /* Validator */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: signInResolver, mode: 'onBlur' });

  /* Request state */
  const { isMutating, trigger: requestSignIn, data: signInData, error } = useSignIn();

  /* Handle submit form */
  const onSubmit = async (data: ISignInApiArgs) => {
    /* Request to get user */
    await requestSignIn(data);

    /* Prevent default */
    return false;
  };

  /* Sign-in success */
  useEffect(() => {
    if (!signInData) return;

    /* Has user */
    if (signInData?.user) {
      const { user, token } = signInData;
      setUser(user);
      saveToLocalStorage(TOKEN_KEY, token);

      sendNotify('Đăng nhập', 'success', 'đăng nhập thành công');
    }

    /* Close modal */
    onCloseModal?.();
  }, [signInData, sendNotify, setUser, onCloseModal]);

  /* Has an error */
  useEffect(() => {
    if (!error) return;

    if (error?.status === 400) {
      sendNotify('Đăng nhập', 'error', 'Thông tin đăng nhập không hợp lệ');
    }
  }, [error, sendNotify]);

  return (
    <form className={authModalStyles.form}>
      <div className={authModalStyles['form-group']}>
        <label htmlFor=''>Email</label>
        <input
          // value='hello@gmail.com'
          {...register('email')}
          id='email'
          name='email'
          placeholder='Nhập địa chỉ email'
        />
        {errors?.email?.message && (
          <span className={authModalStyles['form-error']}>{errors.email.message}</span>
        )}
      </div>

      <div className={authModalStyles['form-group']}>
        <label htmlFor=''>Mật khẩu</label>
        <input
          // value='123456789'
          placeholder='Nhập mật khẩu'
          {...register('password')}
          name='password'
        />
        {errors?.password?.message && (
          <span className={authModalStyles['form-error']}>{errors.password.message}</span>
        )}
      </div>
      <Button
        variant='primary'
        title='Đăng nhập'
        isLoading={isMutating}
        onClick={handleSubmit(onSubmit)}
        cls={authModalStyles['form-submit']}
      />
    </form>
  );
}

export default SignInForm;
