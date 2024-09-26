export interface ISignUpEntity {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ISignInEntity {
  email?: string;
  password?: string;
}
