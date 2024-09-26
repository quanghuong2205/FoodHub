import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const signinValiatorSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Vui lòng nhập địa chỉ email của bạn')
      .email('Địa chỉ email không hợp lệ'),
    password: yup.string().min(8, 'Mật khẩu ít nhất 8 kí tự').required('Vui lòng nhập mật khẩu'),
  })
  .required();

const signupValiatorSchema = yup
  .object()
  .shape({
    name: yup.string().required('Vui lòng nhập tên của bạn'),
    email: yup
      .string()
      .required('Vui lòng nhập địa chỉ email của bạn')
      .email('Địa chỉ email không hợp lệ'),
    password: yup.string().min(8, 'Mật khẩu ít nhất 8 kí tự').required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Mật khẩu xác thực không khớp')
      .required('Vui lòng nhập mật khẩu xác thực'),
  })
  .required();

export const signInResolver = yupResolver(signinValiatorSchema);
export const signUpResolver = yupResolver(signupValiatorSchema);
