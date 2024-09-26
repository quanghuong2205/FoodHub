import { instance } from '@/configs/axios.config';
import { IUserEntity } from '@/entities/user.entity';
import useSWRMutation from 'swr/mutation';

export const SIGN_IN_API = '/sign-in';
export const SIGN_UP_API = '/sign-up';
export const SIGN_OUT_API = '/sign-out';

/**
 * [POST] /sign-in
 */
export interface ISignInApiArgs {
  email: string;
  password: string;
}

export interface ISignInApiData {
  user: IUserEntity;
  token: string;
}

export function useSignIn() {
  return useSWRMutation(
    SIGN_IN_API,
    async (url, { arg: { email, password } }: { arg: ISignInApiArgs }): Promise<ISignInApiData> =>
      await instance.post(url, { email, password }),
  );
}

/**
 * [POST] /sign-up
 */
export interface ISignUpApiArgs {
  email: string;
  password: string;
  name: string;
}

export interface ISignUpApiData {
  id: string;
}

export function useSignUp() {
  return useSWRMutation(
    SIGN_UP_API,
    async (
      url,
      { arg: { email, password, name } }: { arg: ISignUpApiArgs },
    ): Promise<ISignUpApiData> => await instance.post(url, { email, password, name }),
  );
}

/**
 * [POST] /sign-out
 */
export function useSignOut() {
  return useSWRMutation(
    SIGN_OUT_API,
    async (url, {}): Promise<ISignUpApiData> => await instance.post(url),
  );
}
