import React, { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom'; 


export const ProfileView = ({ user, movies, token, updateUser, deleteUser }) => {

  const BASE_URL = 'https://testmovieapi.onrender.com/users/';

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [dob, setDob] = useState(user.dob);
  const favoriteMovies = user && user.favoriteMovies
  ? movies.filter((m) => user.favoriteMovies.includes(m._id))
  : [];

  useEffect(() => {
    if (!token || !user?.username) return;

    fetch(`https://testmovieapi.onrender.com/users/${user.username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((data) => {
      updateUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    })
    .catch((error) => {
      console.error("There was an error fetching the user:", error);
    });
  }, [token, user?.username, updateUser]);

  const handleUpdate = () => {
    const updatedUser = {
      username,
      password,
      email,
      dob,
    };
  
    fetch(`https://testmovieapi.onrender.com/users/${user.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => {
      
      fetch(`https://testmovieapi.onrender.com/users/${user.username}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(completeUserData => {
        updateUser(completeUserData);
      });
    })
    .catch(error => console.log('Error updating user:', error));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      fetch(`https://testmovieapi.onrender.com/users/${user.username}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        deleteUser();
      })
      .catch(error => console.log('Error deleting account:', error));
    }
  };
  
  const addToFavorites = (movieId) => {
    fetch(`${BASE_URL}${user.username}/movies/${movieId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      updateUser(data);
    })
    .catch(error => console.log('Error adding to favorites:', error));
  };

  const removeFromFavorites = (movieId) => {
    fetch(`${BASE_URL}${user.username}/movies/${encodeURIComponent(movieId)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      updateUser(data);
    })
    .catch(error => console.log('Error removing from favorites:', error));
  };  

  return (
    <Container className="vh-100">
      <Row className="mb-4">
        <Col md={12} className="bg-white p-4 rounded shadow-sm text-center">
        <h1 className="mb-4 text-start">Account Information</h1>
          <Form className="mb-3 text-start">
            <Form.Group controlId="formUsername"className="mb-3">
              <Form.Control 
                type="text" 
                value={username} onChange={e => setUsername(e.target.value)} 
                placeholder="Username"
              />
            </Form.Group>
      
            <Form.Group controlId="formPassword"className="mb-3">
              <Form.Control type="password" 
              value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              />
            </Form.Group>
      
            <Form.Group controlId="formEmail"className="mb-3">
              <Form.Control 
                type="email" 
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Group>
      
            <Form.Group controlId="formDob"className="mb-3">
              <Form.Control 
              type="date" 
              value={dob} onChange={e => setDob(e.target.value)}
              placeholder="Date of birth"
              />
            </Form.Group>
      
            <div className="d-flex justify-content-end mb-4">
              <Button variant="primary" onClick={handleUpdate} className="me-2">
                Update
              </Button>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <Link to="/login"  className="text-danger">Delete account permanently</Link>
            </div>  
          </Form>
        </Col>
      </Row>

      <Row className="no-gutters">
        <Col md={12}>
          <h2>Your Favorite Movies</h2>
          <Row className="no-wrap-row">
            {favoriteMovies.length > 0 ? (
              favoriteMovies.map((movie) => (
                <Col xs={6} md={4} lg={3} className="min-width-col" key={movie._id}>
                  <MovieCard 
                    movie={movie} 
                    onAddToFavorites={addToFavorites} 
                    onRemoveFromFavorites={removeFromFavorites} 
                    initialIsFavorite={user.favoriteMovies.includes(movie._id)}
                    simplified={true}
                  />
                </Col>
              ))
            ) : (
              <Col>You have no favorite movies yet.</Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}