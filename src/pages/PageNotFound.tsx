import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Container className="my-5 text-center">
      <Row>
        <Col>
          <h1 className="display-4 mb-4">Oops!</h1>
          <p className="lead">The page you are looking for does not exist.</p>
          <p className="lead">
            Don't worry, you can go back and explore from there.
          </p>
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
