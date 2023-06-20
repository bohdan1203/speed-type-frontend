import { FormEvent, useRef, useState } from "react";
import { Alert, Button, Form, Modal, Stack } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";
import useTexts from "../../hooks/useTexts";

interface AddTextProps {
  setIsAddTextMode: (isAddTextMode: boolean) => void;
}

const AddText = ({ setIsAddTextMode }: AddTextProps) => {
  const [text, setText] = useState("");

  const { addText, addTextError } = useTexts();

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const { currentUser } = useAuth();

  async function submitHandler(e: FormEvent) {
    e.preventDefault();

    if (text.trim() === "") {
      return;
    }

    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
    }

    try {
      const response = await addText({
        userId: currentUser?.userId,
        content: text.trim(),
      }).unwrap();

      if (response.newText) {
        setText("");
        setIsAddTextMode(false);
      }
    } catch (error) {
      console.error(error);

      if (submitButtonRef.current) {
        submitButtonRef.current.disabled = false;
      }
    }
  }

  return (
    <Modal show onHide={() => setIsAddTextMode(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Text</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(addTextError as string) && (
          <Alert variant="danger">{addTextError as string}</Alert>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="text">
            <Form.Control
              as="textarea"
              className="mb-4"
              style={{ resize: "none" }}
              rows={6}
              placeholder="Enter Text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button
              variant="primary"
              type="submit"
              disabled={!text}
              ref={submitButtonRef}
            >
              Add Text
            </Button>
            <Button variant="secondary" onClick={() => setIsAddTextMode(false)}>
              Cancel
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddText;
