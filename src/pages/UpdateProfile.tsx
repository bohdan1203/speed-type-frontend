import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { Container, Form, Toast, ToastContainer } from "react-bootstrap";

import AuthForm from "../components/auth/AuthForm";
import useAuth from "../hooks/useAuth";
import useDispatchWithTypes from "../hooks/useDispatchWithTypes";

import { UpdateProfileFormInputs } from "../interfaces/AuthFormsData";

const initiaUpdateProfileFormState: UpdateProfileFormInputs = {
  username: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

function UpdateUser() {
  const [formState, setFormState] = useState<UpdateProfileFormInputs>(
    initiaUpdateProfileFormState
  );
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    updateProfile,
    updateProfileLoading,
    updateProfileError,
    currentUser,
    setCredentials,
  } = useAuth();
  const dispatch = useDispatchWithTypes();

  useEffect(() => {
    setShowErrorMessage(false);
  }, [formState]);

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState((previousFormState: UpdateProfileFormInputs) => ({
      ...previousFormState,
      username: e.target.value,
    }));
  }

  function handleOldPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState((previousFormState: UpdateProfileFormInputs) => ({
      ...previousFormState,
      oldPassword: e.target.value,
    }));
  }
  function handleNewPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState((previousFormState: UpdateProfileFormInputs) => ({
      ...previousFormState,
      newPassword: e.target.value,
    }));
  }
  function handleConfirmNewPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState((previousFormState: UpdateProfileFormInputs) => ({
      ...previousFormState,
      confirmNewPassword: e.target.value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (!currentUser?.userId) {
        throw new Error("User ID is not available");
      }

      const userData = await updateProfile({
        userId: currentUser?.userId,
        updates: formState,
      }).unwrap();

      dispatch(setCredentials(userData));
      setFormState(initiaUpdateProfileFormState);
      setShowSuccessNotification(true);
    } catch (error) {
      console.error(error);
      setShowErrorMessage(true);
    }
  }

  return (
    <Container>
      <h1 className="text-center my-4">Update Profile</h1>
      <AuthForm
        handleSubmit={handleSubmit}
        isSubmitting={updateProfileLoading}
        isValid={Boolean(
          formState.username ||
            (formState.oldPassword &&
              formState.newPassword &&
              formState.confirmNewPassword)
        )}
        errorMessage={showErrorMessage ? (updateProfileError as string) : ""}
        action="Save Changes"
      >
        <h6 className="text-center">Update Username (Optional)</h6>
        <Form.Control
          type="text"
          placeholder="New Username"
          value={formState.username}
          onChange={handleUsernameChange}
        />
        <h6 className="text-center">Update Password (Optional)</h6>
        <Form.Control
          type="password"
          placeholder="Old Password"
          value={formState.oldPassword}
          onChange={handleOldPasswordChange}
        />
        <Form.Control
          type="password"
          placeholder="New Password"
          value={formState.newPassword}
          onChange={handleNewPasswordChange}
        />
        <Form.Control
          type="password"
          placeholder="Confirm New Password"
          value={formState.confirmNewPassword}
          onChange={handleConfirmNewPasswordChange}
        />
      </AuthForm>

      <ToastContainer className="p-3" position="top-center">
        <Toast
          show={showSuccessNotification}
          onClose={() => setShowSuccessNotification(false)}
          delay={3000}
          autohide
        >
          <Toast.Header className="bg-light text-success">
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body className="bg-light">
            Your profile has been updated
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default UpdateUser;
