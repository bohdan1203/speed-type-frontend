import { FormEvent, ReactNode, useRef, useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";

interface AuthFormProps {
  handleSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
  isValid: boolean;
  errorMessage: string;
  action: string;
  children: ReactNode;
}

function AuthForm({
  handleSubmit,
  isSubmitting,
  isValid,
  errorMessage,
  action,
  children,
}: AuthFormProps) {
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errorMessage) {
      errorRef?.current?.focus();
    }
  }, [errorMessage]);

  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={handleSubmit}>
            {errorMessage && !isSubmitting && (
              <Alert
                variant="danger"
                className="text-center"
                aria-live="assertive"
                ref={errorRef}
              >
                {errorMessage}
              </Alert>
            )}

            <Stack gap={3}>
              {children}
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="mx-auto d-block w-100"
              >
                {isSubmitting ? "Submitting..." : action}
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthForm;
