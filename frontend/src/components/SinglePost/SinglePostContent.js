import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import PostComment from "./PostComment";

export default function SinglePostContent({post}) {
  const [liked, setLiked] = useState(false);

  return (<>
    <header className="p-2">
      <Link to={`/user${post.author}/`}>{post.post_author_username}</Link>
      <Button variant="dark" className="me-2" onClick={() => setLiked(!liked)}>
        {post.likes.length} <FontAwesomeIcon icon={liked ? faThumbsUp : farThumbsUp} />
      </Button>
    </header>
    <h2 className="section-title">{post.title}</h2>
    <p>{post.desc}</p>
    <h4 className="section-title">Comments</h4>
    {post.comments.map((comment, idx) => <PostComment key={"comment" + idx} comment={comment} />)}
  </>)
}
