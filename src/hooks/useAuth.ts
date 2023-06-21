import { useSelector } from "react-redux";

import useLocalStorage from "./useLocalStorage";

import {
  useRefreshQuery,
  useLogInMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
} from "../features/authApiSlice";

import {
  setCredentials,
  clearCredentials,
  getCurrentUser,
  getAccessToken,
} from "../features/authSlice";

function useAuth() {
  const { value: rememberUser } = useLocalStorage("rememberUser");

  const currentUser = useSelector(getCurrentUser);
  const accessToken = useSelector(getAccessToken);

  const {
    data: userData,
    isUninitialized: userDataUninitialized,
    isLoading: userDataLoading,
    isSuccess: userDataSuccess,
    isError: userDataError,
  } = useRefreshQuery(undefined, {
    skip: !rememberUser,
  });

  const [
    signUp,
    { isLoading: signUpLoading, isSuccess: signUpSuccess, error: signUpError },
  ] = useSignUpMutation();

  const [
    logIn,
    {
      data: logInData,
      isLoading: logInLoading,
      isSuccess: logInSuccess,
      error: logInError,
    },
  ] = useLogInMutation();

  const [
    updateProfile,
    { isLoading: updateProfileLoading, error: updateProfileError },
  ] = useUpdateProfileMutation();

  return {
    userData,
    userDataUninitialized,
    userDataLoading,
    userDataSuccess,
    userDataError,

    signUp,
    signUpLoading,
    signUpSuccess,
    signUpError,

    logIn,
    logInData,
    logInLoading,
    logInSuccess,
    logInError,

    updateProfile,
    updateProfileLoading,
    updateProfileError,

    currentUser,
    accessToken,
    setCredentials,
    clearCredentials,
  };
}

export default useAuth;
