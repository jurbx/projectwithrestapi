import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostCard from "./PostCard";

export default function Home() {
  const baseUrl = "https://projectwithrestapi.herokuapp.com",
        [postList, setPostList] = useState([]);

  useEffect(() => {
    // Get all posts
    axios.get(`${baseUrl}/post/list/`)
    .then(res => setPostList(res.data))
    .catch(err => console.warn(err))
  }, []);

  return (
    <main className="text-white py-4">
      <Container className="bg-dark p-4 rounded" id="postCardCont">
        <h2 className="section-title">Recent Posts</h2>
        { postList.length ? postList.map(post => <PostCard key={`post${post.id}`} post={post} />) : ""}
      </Container>
    </main>
  )
}
