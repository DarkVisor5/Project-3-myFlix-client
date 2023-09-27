import React, { useState } from "react";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if(password.length < 6){
      alert("Password must be at least 6 characters long.");
      return;
    }

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch("https://testmovieapi.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error("Signup failed:", errorData);
            throw new Error("Signup failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        alert("Signup successful");
        navigate('/login');
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto">
        <Col md={12} className="bg-white p-4 rounded shadow-sm text-center">
          <div className="mb-4 text-start">
            <p className="mb-2" style={{ fontSize: '1rem' }}>Welcome to</p>
            <p style={{ fontSize: '4rem', fontWeight: 'bold', margin: '0.5rem 0' }}>myFlix</p>
          </div>
          <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                placeholder="Username"
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
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group controlId="formBirthDay" className="mb-3">
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                placeholder="BirthDay"
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Signup
                </Button>
              </div>
          </Form>
          <p><Link to="/login">Already have an account?</Link></p>
        </Col>
      </Row>
    </Container>
  );
};
