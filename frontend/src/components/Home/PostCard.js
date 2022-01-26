import { faComments, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./PostCard.scss";
import { useState } from "react";

export default function PostCard({post}) {
  const [liked, setLiked] = useState(false);

  return (
    <Card bg="dark" text="white">
      <Card.Header>
        <img src={post.author_avatar || "https://fn.zhirkiller.com/wp-content/uploads/2018/09/no-avatar.png"} className="rounded-circle" />
        <div className="d-flex justify-content-between">
          <p>{post.post_author_username}</p>
          <span className="text-muted">Published 11/01/2022</span>
        </div>
        <h3><Link to={`/post${post.id}`}>{post.title}</Link></h3>
      </Card.Header>
      <Card.Body>{post.desc}</Card.Body>
      <Card.Footer>
        <Button variant="dark" className="me-2" onClick={() => setLiked(!liked)}>
          32 <FontAwesomeIcon icon={liked ? faThumbsUp : farThumbsUp} />
          </Button>
        <Link to={`/post${post.id}#comments`} className="btn btn-dark">18 <FontAwesomeIcon icon={faComments} /></Link>
      </Card.Footer>
    </Card>
  )
}
