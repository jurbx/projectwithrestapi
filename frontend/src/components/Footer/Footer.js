import { Col, Container, Row } from "react-bootstrap";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer id="mainFooter" className="bg-dark text-white p-4 border-top">
      <Container>
        <Row>
          <Col sm="auto">
            <a href="https://github.com/jurbx" target="_blank" className="link-primary">jurbx</a>
            &nbsp;&amp;&nbsp;
            <a href="https://github.com/Object417" target="_blank" className="link-primary">Object417</a>
            &nbsp;| 2022
          </Col>
          <Col className="text-end">
            Special thanks to&nbsp;
            <a href="https://www.vecteezy.com/" target="_blank" className="link-secondary">Vecteezy</a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
