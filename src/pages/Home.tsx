import { Container, Row, Col, Image } from "react-bootstrap";

function Home() {
  return (
    <Container className="my-5">
      <Row className="d-flex justify-content-center">
        <Col lg={8}>
          <h1 className="display-3 font-weight-bold mb-5 text-primary">
            Welcome to Speed Type
          </h1>
          <p className="lead">
            Are you looking to{" "}
            <span className="text-secondary">increase your typing speed</span>{" "}
            and accuracy? Look no further than Speed Type! Our free app offers a
            range of features designed to help you improve your typing skills
            and become a faster, more efficient typist.
          </p>
          <h2 className="mt-5">The Benefits of Fast Typing</h2>
          <p>
            Fast typing skills can bring a range of benefits, including improved
            productivity, reduced stress, and enhanced creativity. With Speed
            Type, you can improve your typing speed and accuracy, and unlock the
            potential of fast typing for your personal and professional life.
          </p>
          <h2 className="mt-5">What Speed Type Offers</h2>
          <Row className="mt-3">
            <Col sm={6}>
              <h4 className="text-primary">Customized Lessons</h4>
              <p>
                Get tailored lessons and exercises based on your skill level to
                enhance your typing abilities.
              </p>
            </Col>
            <Col sm={6}>
              <h4 className="text-primary">Real-time Feedback</h4>
              <p>
                Receive instant feedback on your typing speed and accuracy to
                track your progress and make improvements.
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={6}>
              <h4 className="text-primary">Progress Tracking</h4>
              <p>
                Keep track of your personal progress with personalized tracking
                features to stay motivated and achieve your typing goals.
              </p>
            </Col>
            <Col sm={6}>
              <h4 className="text-primary">Engaging Challenges</h4>
              <p>
                Enjoy fun and interactive games and challenges that make typing
                practice exciting and engaging.
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={6}>
              <h4 className="text-primary">Community Support</h4>
              <p>
                Join a vibrant community of users to connect, share experiences,
                and learn from one another.
              </p>
            </Col>
          </Row>
          <h2 className="mt-5">Why Choose Speed Type</h2>
          <Row className="mt-3">
            <Col sm={6}>
              <h4 className="text-primary">User-Friendly Interface</h4>
              <p>
                Experience a simple and intuitive interface that makes it easy
                to get started and navigate through the app.
              </p>
            </Col>
            <Col sm={6}>
              <h4 className="text-primary">Personalized Learning</h4>
              <p>
                Benefit from customized lessons and exercises that adapt to your
                unique needs and skill level for effective learning.
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={6}>
              <h4 className="text-primary">Engaging Activities</h4>
              <p>
                Stay motivated and entertained with a variety of engaging games
                and challenges that make your typing practice enjoyable.
              </p>
            </Col>
            <Col sm={6}>
              <h4 className="text-primary">Real-Time Feedback</h4>
              <p>
                Get real-time feedback and personalized progress tracking to
                monitor your performance and stay on track with your typing
                goals.
              </p>
            </Col>
          </Row>
          <h2 className="mt-5">Get Started with Speed Type Today</h2>
          <p>
            Ready to start improving your typing skills and unlocking the
            benefits of fast typing? Download Speed Type today and get started
            with our range of customizable exercises, engaging games, and
            personalized progress tracking features.
          </p>
          <Row className="mt-5">
            <Col sm={6}>
              <Image
                src="https://source.unsplash.com/random/800x600"
                alt="Keyboard"
                fluid
              />
            </Col>
            <Col sm={6}>
              <Image
                src="https://source.unsplash.com/random/800x600"
                alt="Games"
                fluid
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
