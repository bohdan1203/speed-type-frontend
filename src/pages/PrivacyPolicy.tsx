import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <Container className="my-5 text-center">
      <Row>
        <Col>
          <h1 className="display-4 mb-4">Privacy Policy</h1>
          <p className="lead">Your personal data is safe.</p>
          <p className="lead">Promise!</p>
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

export default PrivacyPolicy;
