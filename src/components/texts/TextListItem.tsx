import { MouseEvent } from "react";
import { Button, Container } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useTexts from "../../hooks/useTexts";

interface TextProps {
  textId: string;
}

function TextListItem({ textId }: TextProps) {
  const { currentUser } = useAuth();
  const { text, deleteText } = useTexts(textId);

  function deleteTextHandler(e: MouseEvent, textId: string) {
    e.stopPropagation();
    deleteText({ textId });
  }

  const canDelete = text?.createdBy === currentUser?.userId;

  return (
    <Container>
      {canDelete && (
        <Button
          variant="danger"
          title="Delete this text"
          className="float-right display-6 d-flex justify-content-center align-items-center"
          onClick={(e: MouseEvent) => text && deleteTextHandler(e, text?._id)}
        >
          <MdDelete className="fs-5" />
        </Button>
      )}
      <Link
        to={`/texts/${text?._id}`}
        className="text-decoration-none text-reset"
      >
        <p className="text-justify m-1">{text?.content}</p>
      </Link>
    </Container>
  );
}

export default TextListItem;
