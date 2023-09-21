import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, movies, token, updateUser, deleteUser }) => {

  console.log("Props received by ProfileView:", { user, movies, token });

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [dob, setDob] = useState(user.dob);
  const favoriteMovies = user && user.favoriteMovies
  ? movies.filter((m) => user.favoriteMovies.includes(m._id))
  : [];
  console.log('Computed favoriteMovies:', favoriteMovies);

  // Add this useEffect in your ProfileView component
  useEffect(() => {
    if (!token || !user?.username) return;

    fetch(`https://testmovieapi.onrender.com/users/${user.username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Fetched user data:', data);
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
      console.log('User updated:', data);
      
    
      fetch(`https://testmovieapi.onrender.com/users/${user.username}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(completeUserData => {
        console.log('Complete user data:', completeUserData);
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
        console.log('Account deleted');
        deleteUser();
      })
      .catch(error => console.log('Error deleting account:', error));
    }
  };
  
  const addToFavorites = (movieTitle) => {
    fetch(`https://testmovieapi.onrender.com/users/${user.username}/movies/${movieTitle}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Movie added to favorites:', data);
      updateUser(data);
    })
    .catch(error => console.log('Error adding to favorites:', error));
  };

  console.log("Current favoriteMovies:", favoriteMovies);

  const removeFromFavorites = (movieTitle) => {
    fetch(`https://testmovieapi.onrender.com/users/${user.username}/movies/${encodeURIComponent(movieTitle)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Movie removed from favorites:', data);
      updateUser(data);
    })
    .catch(error => console.log('Error removing from favorites:', error));
  };  

  return (
    <Col md={8}>
      <h1>Your Profile</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
  
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
  
        <Form.Group controlId="formDob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" value={dob} onChange={e => setDob(e.target.value)} />
        </Form.Group>
  
        <Button variant="primary" onClick={handleUpdate}>Update</Button>
        <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
      </Form>
      
      <h2>Your Favorite Movies</h2>
      <Row>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Col xs={6} md={4} lg={3} key={movie._id}> 
              <div style={{ height: '300px', overflowY: 'auto' }}>
              <MovieCard 
                movie={movie} 
                onAddToFavorites={addToFavorites} 
                onRemoveFromFavorites={removeFromFavorites} 
                initialIsFavorite={true} 
              />

              </div>
            </Col>
          ))
        ) : (
          <Col>You have no favorite movies yet.</Col>
        )}
      </Row>
  </Col>
  );
};