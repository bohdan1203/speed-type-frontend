import { Button, ButtonToolbar, Dropdown, Stack } from "react-bootstrap";
import { MdAccountCircle, MdExitToApp, MdSettings } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useLogOutMutation } from "../../features/authApiSlice";

import useAuth from "../../hooks/useAuth";
import useDispatchWithTypes from "../../hooks/useDispatchWithTypes";
import useTyping from "../../hooks/useTyping";

function HeaderAuth() {
  const { currentUser, clearCredentials } = useAuth();
  const { resetTyping } = useTyping();

  const dispatch = useDispatchWithTypes();

  const navigate = useNavigate();
  const location = useLocation();

  const [logOut] = useLogOutMutation();

  function handleLogOut() {
    logOut({ userId: currentUser?.userId as string })
      .unwrap()
      .then((response) => {
        if (response === null) {
          resetTyping();
          dispatch(clearCredentials());
          navigate("/auth/login");

          //////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////

          localStorage.removeItem("currentUser");

          //////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////
        }
      });
  }

  return (
    <>
      {currentUser && (
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="primary"
            className="d-flex align-items-center"
          >
            <MdAccountCircle className="me-2" size={24} />
            {currentUser.username}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/update-profile">
              <MdAccountCircle className="me-2" size={18} />
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/settings">
              <MdSettings className="me-2" size={18} />
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogOut} className="text-danger">
              <MdExitToApp className="me-2" size={18} />
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      {!currentUser && (
        <ButtonToolbar className="ms-auto">
          <Stack direction="horizontal" gap={2}>
            {!location.pathname.includes("/signup") && (
              <Link to="/auth/signup">
                <Button variant="primary">Sign Up</Button>
              </Link>
            )}
            {!location.pathname.includes("/login") && (
              <Link to="/auth/login">
                <Button variant="primary">Log In</Button>
              </Link>
            )}
          </Stack>
        </ButtonToolbar>
      )}
    </>
  );
}

export default HeaderAuth;
