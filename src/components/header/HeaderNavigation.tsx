import { Container, Nav, Navbar, Offcanvas, Spinner } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";

// import { useRefreshQuery } from "../../features/authApiSlice";

import useAuth from "../../hooks/useAuth";
// import useLocalStorage from "../../hooks/useLocalStorage";

import HeaderAuth from "./HeaderAuth";

function HeaderNavigation() {
  const location = useLocation();

  const { currentUser } = useAuth();
  // const { value: rememberUser } = useLocalStorage("rememberUser");

  // const { isLoading: userDataLoading } = useRefreshQuery("refresh", {
  //   skip: !rememberUser,
  // });

  const userDataLoading = false;

  function getActiveLinkClassName(pathname: string): string {
    return location.pathname.includes(pathname) ? "text-warning fw-bold" : "";
  }

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold fst-italic">
          Speed Type
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Offcanvas aria-labelledby="offcanvas" placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvas">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {userDataLoading ? (
              <Spinner variant="white" className="mx-auto" />
            ) : (
              <>
                {currentUser && (
                  <Nav className="me-auto">
                    <Nav.Link
                      as={NavLink}
                      to="/dashboard"
                      className={getActiveLinkClassName("/dashboard")}
                    >
                      Dashboard
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/texts"
                      className={getActiveLinkClassName("/texts")}
                    >
                      Texts
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/results"
                      className={getActiveLinkClassName("/results")}
                    >
                      Results
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/progress"
                      className={getActiveLinkClassName("/progress")}
                    >
                      Progress
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/leaderboard"
                      className={getActiveLinkClassName("/leaderboard")}
                    >
                      Leaderboard
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/achievements"
                      className={getActiveLinkClassName("/achievements")}
                    >
                      Achievements
                    </Nav.Link>
                  </Nav>
                )}
                <HeaderAuth />
              </>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default HeaderNavigation;
