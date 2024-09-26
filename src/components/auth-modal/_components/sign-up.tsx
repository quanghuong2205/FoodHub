import authModalStyles from '../auth-modal.module.scss';
import { useForm } from 'react-hook-form';
import { signUpResolver } from '../validation-rules';
import Button from '@/shared/button';
import { useContext, useEffect } from 'react';
import { NotifyContext } from '@/providers/notify.provider';
import { ISignUpApiArgs, useSignUp } from '@/services/auth.service';

interface ISignUpFormProps {
  handleSwitchAuthMode: () => void;
}

function SignUpForm({ handleSwitchAuthMode }: ISignUpFormProps) {
  /* Send notify */
  const { sendNotify } = useContext(NotifyContext);

  /* Validator */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: signUpResolver, mode: 'onBlur' });

  /* Request state */
  const { isMutating, trigger: requestSignUp, error, data: signUpData } = useSignUp();

  /* Handle submit form */
  const onSubmit = async (data: ISignUpApiArgs) => {
    /* Request to get user */
    await requestSignUp(data);

    /* Prevent default */
    return false;
  };

  /* Sign-up success */
  useEffect(() => {
    if (!signUpData) return;

    /* Has user */
    if (signUpData?.id) {
      sendNotify('Đăng ký', 'success', 'đăng ký thành công');
    }

    /* Switch to sign-in */
    handleSwitchAuthMode();
  }, [signUpData, sendNotify, handleSwitchAuthMode]);

  /* Has an error */
  useEffect(() => {
    if (!error) return;

    if (error?.status === 400) {
      sendNotify('Đăng ký', 'error', 'Email đã tồn tại');
    }
  }, [error, sendNotify]);

  return (
    <form className={authModalStyles.form}>
      <div className={authModalStyles['form-group']}>
        <label htmlFor=''>Tên người dùng</label>
        <input
          placeholder='Nhập tên của bạn'
          {...register('name')}
          name='name'
        />
        {errors?.name?.message && (
          <span className={authModalStyles['form-error']}>{errors.name.message}</span>
        )}
      </div>

      <div className={authModalStyles['form-group']}>
        <label htmlFor=''>Email</label>
        <input
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
          placeholder='Nhập mật khẩu'
          {...register('password')}
          name='password'
        />
        {errors?.password?.message && (
          <span className={authModalStyles['form-error']}>{errors.password.message}</span>
        )}
      </div>

      <div className={authModalStyles['form-group']}>
        <label htmlFor=''>Nhập khẩu xác thực:</label>
        <input
          placeholder='Nhập lại mật khẩu'
          {...register('confirmPassword')}
          name='confirmPassword'
        />
        {errors?.confirmPassword?.message && (
          <span className={authModalStyles['form-error']}>{errors.confirmPassword.message}</span>
        )}
      </div>

      <Button
        variant='primary'
        title='Đăng ký'
        isLoading={isMutating}
        onClick={handleSubmit(onSubmit)}
        cls={authModalStyles['form-submit']}
      />
    </form>
  );
}

export default SignUpForm;
