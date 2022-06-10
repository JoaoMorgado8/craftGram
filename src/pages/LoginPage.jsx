import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, body)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/feedPage");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <div className="LoginPage">
      <Card>
        <Card.Header as="h4">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="username">Minecraft Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={handleUsername}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </Form.Group>
            <br />
            <Button style={{ width: "20rem" }} variant="dark" type="submit">
              Login
            </Button>
          </Form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br />
          <Card.Text>Don't have an account?</Card.Text>

          <Link to="/signup">
            <Button style={{ width: "20rem" }} variant="dark">
              Sign Up
            </Button>{" "}
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;
