import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Form, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  
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
      console.log("Login response: ",data);
      if (data.user && data.token) {
        if(!data.user.FavouriteMovies) {
          data.user.FavouriteMovies = [];
        }
        localStorage.setItem('token', data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert(data.message || "Login failed");
      }
    })
    .catch(error => {
      console.error("There was an error logging in:", error);
    });
  };

  const goToSignup = () => {
    navigate('/signup');
  }

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
      <p>You don't have an account?
        <Button variant="link" onClick={goToSignup}> Signup here </Button>
      </p>
    </Col>
  );
};

LoginView.propTypes={
  onLoggedIn: PropTypes.func.isRequired,
};
