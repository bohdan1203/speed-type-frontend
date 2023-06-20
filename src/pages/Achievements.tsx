import { Container, Alert } from "react-bootstrap";

function Achievements() {
  return (
    <Container className="py-4">
      <Alert variant="info" className="text-center">
        <Alert.Heading className="display-4">
          <span role="img" aria-label="Trophy Emoji">
            🏆
          </span>{" "}
          Exciting Achievements Coming Soon!{" "}
          <span role="img" aria-label="Party Popper Emoji">
            🎉
          </span>
        </Alert.Heading>
        <p className="lead">
          Get ready for an amazing journey of achievements and rewards!
          <br />
          We're currently working hard to bring you an epic achievements system
          that will make your accomplishments shine like never before.{" "}
          <span role="img" aria-label="Star Emoji">
            🌟✨
          </span>
        </p>
        <p>
          Stay tuned and be prepared to unlock a world of greatness!{" "}
          <span role="img" aria-label="Rocket Emoji">
            🚀
          </span>{" "}
          <span role="img" aria-label="Fire Emoji">
            🔥
          </span>
        </p>
      </Alert>
    </Container>
  );
}

export default Achievements;
