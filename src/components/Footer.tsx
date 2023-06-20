import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container className="d-flex gap-2">
        <p className="mb-0">&copy; 2023 Bohdan Katsenko</p>
        <Link to="/privacy-policy" className="text-decoration-none">
          Privacy Policy
        </Link>
      </Container>
    </footer>
  );
}

export default Footer;
