import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";

import useDispatchWithTypes from "../hooks/useDispatchWithTypes";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

import AuthForm from "../components/auth/AuthForm";

import { LogInFormInputs } from "../interfaces/AuthFormsData";

const initialLogInFormState: LogInFormInputs = {
  usernameOrEmail: "",
  password: "",
};

function LogIn() {
  const [formState, setFormState] = useState<LogInFormInputs>(
    initialLogInFormState
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const dispatch = useDispatchWithTypes();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { logIn, logInData, logInLoading, logInError, setCredentials } =
    useAuth();
  const { value: rememberUser, setValue: setRememberUser } =
    useLocalStorage("rememberUser");

  const usernameOrEmailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameOrEmailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    setShowErrorMessage(false);
  }, [formState]);

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (logInData && rememberUser) {
      const userData = {
        user: logInData.user,
        accessToken: logInData.accessToken,
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));
    }
  }, [logInData, rememberUser]);

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  function handleUsernameOrEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState((previousFormState: LogInFormInputs) => ({
      ...previousFormState,
      usernameOrEmail: e.target.value,
    }));
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState((previousFormState: LogInFormInputs) => ({
      ...previousFormState,
      password: e.target.value,
    }));
  }

  function handleRemeberUserChange() {
    setRememberUser((prev: boolean) => !prev);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const userData = await logIn(formState).unwrap();

      dispatch(setCredentials(userData));
      setFormState(initialLogInFormState);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setShowErrorMessage(true);
    }
  }

  return (
    <Container>
      <h1 className="text-center my-4">Log In</h1>

      <AuthForm
        handleSubmit={handleSubmit}
        isSubmitting={logInLoading}
        isValid={Object.values(formState).every(Boolean)}
        errorMessage={showErrorMessage ? (logInError as string) : ""}
        action="Log In"
      >
        <Form.Control
          type="text"
          placeholder="Username or Email"
          value={formState.usernameOrEmail}
          onChange={handleUsernameOrEmailChange}
          ref={usernameOrEmailInputRef}
        />
        <Form.Control
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={handlePasswordChange}
        />
        <Form.Group controlId="remember-user">
          <Form.Check
            type="checkbox"
            label="Remember Me"
            checked={rememberUser}
            onChange={handleRemeberUserChange}
          />
        </Form.Group>
      </AuthForm>
      <p className="text-center mt-3">
        Need an account? <Link to="/auth/signup">Sign Up.</Link>
      </p>
    </Container>
  );
}

export default LogIn;
