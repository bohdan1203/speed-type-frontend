import { useMemo } from "react";
import { ListGroup } from "react-bootstrap";

import useTexts from "../../hooks/useTexts";

import TextListItem from "./TextListItem";

interface TextsListProps {
  searchQuery: string;
}

function TextsList({ searchQuery }: TextsListProps) {
  const { texts } = useTexts();

  const filteredTexts = useMemo(() => {
    return texts.filter((text) =>
      text.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [texts, searchQuery]);

  return (
    <ListGroup className="mb-4">
      {filteredTexts.map((text, i) => (
        <ListGroup.Item className="text-list-item" key={text._id || i}>
          <TextListItem textId={text._id} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TextsList;
