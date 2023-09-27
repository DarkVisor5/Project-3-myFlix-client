import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export const LoginView = ({ onLoggedIn }) => {
  const navigate = useNavigate();
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
  };
  

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto">
        <Col md={12} className="bg-white p-4 rounded shadow-sm text-center">
        <div className="mb-4 text-start">  {/* Aggiunta la classe text-start */}
            <p className="mb-2" style={{ fontSize: '1rem' }}>Welcome to</p>
            <p style={{ fontSize: '4rem', fontWeight: 'bold', margin: '0.5rem 0' }}>myFlix</p>
        </div>
            <Form onSubmit={handleSubmit} className="mb-3">
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                  minLength="3"
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
            <p className="text-center mt-3">
              <Link to="/signup" className="text-primary">Don't have an account?</Link>
            </p>
          </Col>
        </Row>
    </Container>

  );
};

LoginView.propTypes={
  onLoggedIn: PropTypes.func.isRequired,
};
