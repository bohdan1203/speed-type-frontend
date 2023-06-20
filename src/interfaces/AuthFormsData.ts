export interface SignUpFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormValidity {
  username: boolean;
  email: boolean;
  password: boolean;
  passwordsMatch: boolean;
}

export interface LogInFormInputs {
  usernameOrEmail: string;
  password: string;
}

export interface LogOutData {
  userId: string;
}

export interface UpdateProfileFormInputs {
  username?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword: string;
}
