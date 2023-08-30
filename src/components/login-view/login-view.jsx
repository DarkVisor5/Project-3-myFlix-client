import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Form, Col } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!username || !password) {
      alert("All fields are required!");
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    // Fetch for logging in
    fetch("https://testmovieapi.onrender.com/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('AlGoriThm!', data.token);
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while logging in.");
    });
  };

  return (
    <Col md={5}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Col>
  );
};

LoginView.propTypes={
  onLoggedIn: PropTypes.func.isRequired,
};
