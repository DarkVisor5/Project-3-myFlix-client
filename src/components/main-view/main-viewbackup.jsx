import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log('useEffect is running');
    const fetchData = async () => {
      console.log('Current token:', token);
      if (!token) return;
  
      try {
        const response = await fetch("https://testmovieapi.onrender.com/movies", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = await response.json();
        const moviesFromApi = data.map((doc) => ({
          id: doc._id,
          title: doc.title,
          image: doc.image_url,
          director: doc.director,
          genre: doc.genre,
          description: doc.description,
          featured: doc.featured,
        }));
        
        setMovies(moviesFromApi);
  
      } catch (error) {
        console.error("There was an error fetching the movies:", error);
      }
    };
  
    fetchData();
  }, [token]);
  
  // To log updated movies state
  useEffect(() => {
    console.log("Updated movies:", movies);
  }, [movies]);
  

  if (!user){
    return (
      <LoginView
        onLoggedIn={(user,token) => {
          setUser(user);
          setToken(token);
        }}
        />
    );
  }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => setUser(null)}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/" /> : <Col md={5}><SignupView /></Col>
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <Col md={5}><LoginView onLoggedIn={user => setUser(user)} /></Col>
            }
          />
          <Route 
            path="/movies/:movieId"
            element={
              !user ? <Navigate to="/login" replace /> 
              : movies.length === 0 ? <Col>No movies available!</Col>
              : <Col md={8}><MovieView movies={movies} /></Col>
            }
          />
          <Route 
            path="/profile"
            element={
              !user ? <Navigate to="/login" replace />
              : <Col md={8}><ProfileView /></Col>
            }
          />
          <Route 
            path="/"
            element={
              !user ? <Navigate to="/login" replace />
              : movies.length === 0 ? <Col>No movies available!</Col>
              : <>
                {movies.map(movie => <Col md={3} key={movie.id}><MovieCard movie={movie} /></Col>)}
                </>
            }
          />
        </Routes>
      </Row>
      <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>;
    </BrowserRouter>
  );
};
