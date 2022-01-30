import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SinglePostContent from "./SinglePostContent";
import NotFound from "../NotFound";
import { Container } from "react-bootstrap";
import axios from "axios";

export default function SinglePost() {
  const
    [post, setPost] = useState({}),
    baseUrl = "https://projectwithrestapi.herokuapp.com",
    { postId } = useParams();
  

  useEffect(() => {
    axios.get(`${baseUrl}/post/detail/${postId}/`)
    .then(res => setPost(res.data))
  }, []);

  return (
    <main className="text-white py-4">
      <Container className="py-4 bg-dark rounded">
        {post.title ? <SinglePostContent post={post} /> : <NotFound />}
      </Container>
    </main>
  )
}
