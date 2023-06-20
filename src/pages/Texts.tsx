import { ChangeEvent, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FormControl,
  Row,
} from "react-bootstrap";

import AddText from "../components/texts/AddText";
import TextsList from "../components/texts/TextsList";

import useTexts from "../hooks/useTexts";

function Texts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddTextMode, setIsAddTextMode] = useState(false);

  const { texts, getTextsLoading, getTextsSuccess, getTextsError } = useTexts();

  function searchQueryChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  return (
    <Container>
      <Row className="mt-4 flex-wrap">
        <Col xs={12} sm={9} className="mb-4">
          <FormControl
            placeholder="Search Text"
            onChange={searchQueryChangeHandler}
          />
        </Col>

        <Col xs={12} sm={3} className="mb-4">
          <Button onClick={() => setIsAddTextMode(true)} className="w-100">
            Add Text
          </Button>
        </Col>
      </Row>

      {isAddTextMode && <AddText setIsAddTextMode={setIsAddTextMode} />}

      {getTextsLoading && (
        <Alert variant="info" className="text-center">
          Loading texts...
        </Alert>
      )}
      {getTextsError && (
        <Alert variant="danger" className="text-center">
          Failed to fetch texts.
        </Alert>
      )}
      {getTextsSuccess && texts.length === 0 && (
        <Alert variant="warning" className="text-center">
          No texts found
        </Alert>
      )}

      {texts?.length > 0 && <TextsList searchQuery={searchQuery} />}
    </Container>
  );
}

export default Texts;
