import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useDispatchWithTypes from "../hooks/useDispatchWithTypes";
import useAuth from "../hooks/useAuth";

import AuthForm from "../components/auth/AuthForm";
import SignUpInputAlert from "../components/auth/SignUpInputAlert";

import {
  SignUpFormInputs,
  SignUpFormValidity,
} from "../interfaces/AuthFormsData";

const USERNAME_REGEX = /^(?=[a-zA-Z])[a-zA-Z0-9 -]{3,30}$/;

const initialSignUpFormInputsState: SignUpFormInputs = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialSignUpFormValidityState: SignUpFormValidity = {
  username: false,
  email: false,
  password: false,
  passwordsMatch: false,
};

function SignUp() {
  const [formState, setFormState] = useState<SignUpFormInputs>(
    initialSignUpFormInputsState
  );

  const [inputsValidity, setInputsValidity] = useState<SignUpFormValidity>(
    initialSignUpFormValidityState
  );

  const [inputsFocus, setInputsFocus] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatchWithTypes();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signUp, signUpLoading, signUpError, setCredentials } = useAuth();

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    setShowErrorMessage(false);
  }, [formState]);

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    const enteredUsername = e.target.value;

    setFormState((previousFormState: SignUpFormInputs) => ({
      ...previousFormState,
      username: enteredUsername,
    }));

    setInputsValidity((previousValidityState: SignUpFormValidity) => ({
      ...previousValidityState,
      username: USERNAME_REGEX.test(enteredUsername),
    }));
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const enteredEmail = e.target.value;

    setFormState((previousFormState: SignUpFormInputs) => ({
      ...previousFormState,
      email: enteredEmail,
    }));

    setInputsValidity((previousValidityState: SignUpFormValidity) => ({
      ...previousValidityState,
      email:
        enteredEmail.includes("@") &&
        !enteredEmail.startsWith("@") &&
        !enteredEmail.endsWith("@"),
    }));
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const enteredPassword = e.target.value;

    setFormState((previousFormState: SignUpFormInputs) => ({
      ...previousFormState,
      password: enteredPassword,
    }));

    setInputsValidity((previousValidityState: SignUpFormValidity) => ({
      ...previousValidityState,
      password: enteredPassword !== "",
      passwordsMatch:
        enteredPassword === formState.confirmPassword && enteredPassword !== "",
    }));
  }
  function handleConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const enteredConfirmPassword = e.target.value;

    setFormState((previousFormState: SignUpFormInputs) => ({
      ...previousFormState,
      confirmPassword: enteredConfirmPassword,
    }));

    setInputsValidity((previousValidityState: SignUpFormValidity) => ({
      ...previousValidityState,
      password: formState.password !== "",
      passwordsMatch:
        formState.password === enteredConfirmPassword &&
        enteredConfirmPassword !== "",
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const userData = await signUp(formState).unwrap();

      dispatch(setCredentials(userData));
      setFormState(initialSignUpFormInputsState);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setShowErrorMessage(true);
    }
  }

  return (
    <Container>
      <h1 className="text-center my-4">Sign Up</h1>
      <AuthForm
        handleSubmit={handleSubmit}
        isSubmitting={signUpLoading}
        isValid={Object.values(inputsValidity).every(Boolean)}
        errorMessage={showErrorMessage ? (signUpError as string) : ""}
        action="Sign Up"
      >
        <Form.Control
          type="text"
          placeholder="Username"
          autoComplete="off"
          required
          value={formState.username}
          ref={usernameInputRef}
          onChange={handleUsernameChange}
          onFocus={() => setInputsFocus({ ...inputsFocus, username: true })}
          onBlur={() => setInputsFocus({ ...inputsFocus, username: false })}
          aria-invalid={!inputsValidity.username}
          aria-describedby="username-info"
          className={inputsValidity.username ? "signup-input-valid" : ""}
        />

        {inputsFocus.username &&
          formState.username &&
          !inputsValidity.username && (
            <SignUpInputAlert
              id="username-info"
              alert="Username must start with a letter and can contain alphanumeric characters (a-z, A-Z, or 0-9), space, and hyphen (-). The length should be between 3 and 30 characters."
            />
          )}

        <Form.Control
          type="email"
          placeholder="Email"
          autoComplete="off"
          required
          value={formState.email}
          onChange={handleEmailChange}
          onFocus={() => setInputsFocus({ ...inputsFocus, email: true })}
          onBlur={() => setInputsFocus({ ...inputsFocus, email: false })}
          aria-invalid={!inputsValidity.email}
          aria-describedby="email-info"
          className={inputsValidity.email ? "signup-input-valid" : ""}
        />

        {inputsFocus.email && !inputsValidity.email && (
          <SignUpInputAlert
            id="email-info"
            alert="Please, enter a valid email address"
          />
        )}

        <Form.Control
          type="password"
          placeholder="Password"
          required
          value={formState.password}
          onChange={handlePasswordChange}
          onFocus={() => setInputsFocus({ ...inputsFocus, password: true })}
          onBlur={() => setInputsFocus({ ...inputsFocus, password: false })}
          aria-invalid={!inputsValidity.password}
          aria-describedby="password-info"
          className={inputsValidity.password ? "signup-input-valid" : ""}
        />

        {inputsFocus.password && !inputsValidity.password && (
          <SignUpInputAlert
            id="password-info"
            alert="Please, enter a valid password"
          />
        )}

        <Form.Control
          type="password"
          placeholder="Confirm Password"
          required
          value={formState.confirmPassword}
          onChange={handleConfirmPasswordChange}
          onFocus={() =>
            setInputsFocus({ ...inputsFocus, confirmPassword: true })
          }
          onBlur={() =>
            setInputsFocus({ ...inputsFocus, confirmPassword: false })
          }
          aria-invalid={!inputsValidity.passwordsMatch}
          aria-describedby="confirm-password-info"
          className={inputsValidity.passwordsMatch ? "signup-input-valid" : ""}
        />

        {(inputsFocus.confirmPassword || inputsFocus.password) &&
          inputsValidity.password &&
          formState.confirmPassword &&
          !inputsValidity.passwordsMatch && (
            <SignUpInputAlert
              id="confirm-password-info"
              alert="Passwords must match"
            />
          )}
      </AuthForm>
      <p className="text-center mt-3">
        Already have an account? <Link to="/auth/login">Log In</Link>.
      </p>
    </Container>
  );
}

export default SignUp;
