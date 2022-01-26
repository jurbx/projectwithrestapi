import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserAccount.scss";

export default function UserAccount() {
  const baseUrl = "https://projectwithrestapi.herokuapp.com";
  let { userId } = useParams();
  const [user, setUser] = useState({});
  const [errMsg, setErrMsg] = useState("");

  // if (isNaN(+userId) || +userId < 0 ) {
  //   return <Alert variant="danger">Invalid User Id</Alert>
  // }

  useEffect(() => {
    if(isNaN(+userId) || +userId < 0) {
      setErrMsg("Invalid User Id");
    } else {
      axios.get(`${baseUrl}/authentication/account/public/${userId}/`)
        .then(res => setUser(res.data))
        .catch(err => {
          console.warn(err);
          setErrMsg("We cannot find the user with this id");
        })
    }
  }, []);

  return (
    errMsg ?
    <Alert variant="danger">{errMsg}</Alert> :
    <Container className="mt-4">
      <Card className="p-2 user-card" bg="dark" text="white">
        <Col sm="auto">
          <div className="user-avatar-wrapper me-4">
            <img src={`${user.avatar}`} alt="User Avatar" />
          </div>
        </Col>
        <Col>
          <h3>{user.first_name || "Jack"} {user.last_name || "Friday"}</h3>
          <p className="text-muted">{user.username}</p>
        </Col>
      </Card>
    </Container>
  )
}
