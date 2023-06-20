import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthenticatedOnly = () => {
  const { currentUser, userData, userDataLoading } = useAuth();
  const location = useLocation();

  return (
    <>
      {currentUser && <Outlet />}
      {!currentUser && !userDataLoading && !userData && (
        <Navigate to="/auth/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default AuthenticatedOnly;
