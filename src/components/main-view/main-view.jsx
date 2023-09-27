import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SearchBar from '../search-bar/search-bar.jsx';
import Col from 'react-bootstrap/Col';
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = (updatedUser) => {
    if (!updatedUser.favoriteMovies) {
      updatedUser.favoriteMovies = [];
    }
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  const deleteUser = () => {
    setUser(null);
    setToken(null);
  };

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {

    if(!token) return;

    fetch("https://testmovieapi.onrender.com/movies",{
      headers: {Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            _id: doc._id,
            title: doc.title,
            image_url: doc.image_url,
            director: doc.director,
            genre: doc.genre,
            description: doc.description,
            featured: doc.featured,
          };
        });
        setMovies(moviesFromApi);
      })

      .catch(error=>{
        console.error("There was an error fetching the movies:",error)
      });
  },[token]);

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleLogin = (loggedInUser, loggedInToken) => {
    if (!loggedInUser.favoriteMovies) {
      loggedInUser.favoriteMovies = [];
    }
    setUser(loggedInUser);
    setToken(loggedInToken);
  
    localStorage.setItem('token', loggedInToken);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  const addToFavorites = (movieId) => {
    fetch(`https://testmovieapi.onrender.com/users/${user.username}/movies/${movieId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.status === 400) {
        return Promise.reject('Movie already in favorites');
      }
      return response.json();
    })
    .then(data => {
      updateUser(data);
    })
    .catch(error => {
      console.log('Error adding to favorites:', error);
      if (error === 'Movie already in favorites') {
        alert('This movie is already in your favorites!');
      }
    });
  };  

  const removeFromFavorites = (movieId) => {
    fetch(`https://testmovieapi.onrender.com/users/${user.username}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      updateUser(data);
    })
    .catch(error => {
      console.log('Error removing from favorites:', error);
    });
};
    const handleSearch = term => {
      setSearchTerm(term);
    };

    return (
      <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={logOut}
        />
        <Container>
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
                  user ? <Navigate to="/" /> : <Col md={5}><LoginView onLoggedIn={handleLogin} /></Col>
                }
              />
              <Route
                path="/movies/:movieId"
                element={
                  !user ? <Navigate to="/login" replace />
                  : movies.length === 0 ? <Col>No movies available!</Col>
                  : <MovieView
                      movies={movies}
                      onAddToFavorites={addToFavorites}
                      onRemoveFromFavorites={removeFromFavorites}
                      favoriteMovies={user.favoriteMovies}
                    />
                }
              />

              <Route
                path="/profile"
                element={
                  !user ? <Navigate to="/login" replace />
                  : <Col md={8}>
                    {user && user.favoriteMovies ?
                      <ProfileView user={user} movies={movies} token={token} updateUser={updateUser} deleteUser={deleteUser} />
                      : <div>Loading...</div>}
                  </Col>
                }
              />
              <Route
                path="/"
                element={
                  !user ? <Navigate to="/login" replace />
                  : movies.length === 0 ? <Col>No movies available!</Col>
                  : (
                    <>
                       <Col md={12}>
                          <SearchBar onSearch={handleSearch} />
                      </Col>

                      {movies.filter(movie => 
                          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map(movie => (
                        <Col md={3} key={movie._id}>
                          <MovieCard
                              movie={movie}
                              onAddToFavorites={addToFavorites}
                              onRemoveFromFavorites={removeFromFavorites}
                              initialIsFavorite={user.favoriteMovies ? user.favoriteMovies.includes(movie._id) : false}
                          />
                    </Col>
                      ))}
                    </>
                  )
                }
              />
            </Routes>
          </Row>
        </Container>
      </BrowserRouter>
    );
}
