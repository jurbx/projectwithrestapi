import { Card, Col } from "react-bootstrap"

export default function AuthorCard({author}) {
  return (
    <Card className="p-2 author-card" bg="dark">
      <Col sm="auto" className="avatar-wrapper me-2">
        <img
          src={author.avatar}
          alt={author.nickname}
          width="320"
        />
      </Col>
      <Col>
        <h3>
          <a href={author.link} target="_blank" className="link-light">{author.nickname}</a>
          <small className="text-muted"> | {author.occupation}</small>
        </h3>
        {author.description.map((para, idx) => <p key={"authorPara" + idx}>{para}</p>)}
      </Col>
    </Card>
  )
}
