import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <label htmlFor="username">Name</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label htmlFor="userImage">Avatar</label>
        <input
          type="file"
          alt="user image"
          name="userImage"
          value={userImage}
          src={handleUserImage}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Already have an account?</p>
      <Link to="/login"> Login</Link>
    </div>
  );
}

export default SignupPage;
