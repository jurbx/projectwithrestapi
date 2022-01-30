import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.scss";
import HeaderNav from "./HeaderNav";

export default function Header({activeTab}) {
  return (
    <header id="mainHeader" className="bg-dark text-white p-4 border-bottom">
      <Container>
        <Row>
          <Col sm="auto">
            <Link to="/" className="d-flex align-items-baseline text-decoration-none text-white page-title">
              <FontAwesomeIcon icon={faBlog} className="me-2 h1 mb-0 logo" />
              <h1 className="mb-0">Internet Blog</h1>
            </Link>
          </Col>
          <Col className="d-flex align-items-center">
            <HeaderNav activeTab={activeTab} />
          </Col>
        </Row>
      </Container>
    </header>
  )
}
