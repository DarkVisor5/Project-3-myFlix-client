import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Card, Button } from 'react-bootstrap';


export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedMovies, setSelectedMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('AlGoriThm!');
    // If the user is logged in, fetch movies
    if(jwt){
      setUser('existingUser');
    }
    if(jwt) {
      setIsLoading(true);  // Start loading
      setUser('existingUser');
      fetch("https://testmovieapi.onrender.com/movies", {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("An error occurred:", error);
        setIsLoading(false);
      });
    }
  }, [user]); // Effect depends on user state

  const handleSignedUp = (username)=>{
    setUser(username);
  };

  // Function to logout
  const logout = () => {
    localStorage.removeItem('AlGoriThm!');
    setUser(null);
  };

  return (
    <Container>
      <Row>
        {isLoading ? (
          <div>Loading...</div>
        ) : !user ? (
          <>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            <SignupView onSignedUp={(username) => handleSignedUp(username)} />
          </>
        ) : selectedMovies ? (
          <MovieView movie={selectedMovies} onBackClick={() => setSelectedMovies(null)} />
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            <Row>
              <Col className="text-right">
                <Button style={{ float: "right" }} onClick={logout}>Logout</Button>
              </Col>
            </Row>

            {movies.map((movie) => (
              <Col className="mb-1 p-1" key={movie._id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovies(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};