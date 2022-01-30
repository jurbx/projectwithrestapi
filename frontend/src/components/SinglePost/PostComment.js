import { Card } from "react-bootstrap";

export default function PostComment({comment}) {
  return (
    <Card bg="dark">
      <Card.Header>{comment.comment_author_username}</Card.Header>
      <Card.Body>{comment.message}</Card.Body>
    </Card>
  )
}
