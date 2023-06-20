import { Container, Form } from "react-bootstrap";

import useLocalStorage from "../hooks/useLocalStorage";

function Settings() {
  const { value: soundSignalOnMistake, setValue: setSoundSignalOnMistake } =
    useLocalStorage("playMistakeSound");

  return (
    <Container className="py-4">
      <h1>Settings</h1>
      <Form>
        <Form.Group controlId="mistakeSound">
          <Form.Check
            type="checkbox"
            label="Sound signal on mistake"
            checked={soundSignalOnMistake}
            onChange={() => {
              setSoundSignalOnMistake((prev: boolean) => !prev);
            }}
          />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Settings;
