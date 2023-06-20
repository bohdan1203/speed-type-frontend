import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";

import useAuth from "../hooks/useAuth";

const NotAuthenticatedOnly = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser, userDataLoading } = useAuth();

  useEffect(() => {
    if (!userDataLoading) {
      setIsLoading(false);
    }
  }, [userDataLoading, currentUser]);

  let content;

  if (isLoading) {
    content = <Alert>Loading...</Alert>;
  } else if (!isLoading && currentUser) {
    content = <Navigate to="/dashboard" />;
  } else {
    content = <Outlet />;
  }

  return <Container className="my-4">{content}</Container>;
};

export default NotAuthenticatedOnly;
