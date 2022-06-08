import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

function SignupPage() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleUserImage = (e) => setUserImage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password, userImage };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, body)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <div className="SignupPage">
      <Card>
        <Card.Header as="h4">Signup</Card.Header>
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
            <Form.Group>
              <Form.Label htmlFor="userImage">Avatar</Form.Label>
              <Form.Control
                type="file"
                alt="user image"
                name="userImage"
                value={userImage}
                onChange={handleUserImage}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Sign Up
            </Button>
          </Form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Card.Text>Already have an account?</Card.Text>
          <Link to="/login">
            <Button variant="dark">Login</Button>{" "}
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignupPage;
