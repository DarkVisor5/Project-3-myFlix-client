import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedMovies, setSelectedMovies] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    // If the user is logged in, fetch movies
    if(jwt) {
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
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
    }
  }, [user]); // Effect depends on user state

  const handleSignedUp = (username)=>{
    setUser(username);
  };

  // Function to logout
  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  if (!user) {
    return (
      <div className="auth-container">
        <LoginView onLoggedIn={(user) => setUser(user)} />;
        <SignupView onSignedUp={(username) => handleSignedUp(username)}/>
      </div>
    );
  }

  if (selectedMovies) {
    return (
      <MovieView movie={selectedMovies} onBackClick={() => setSelectedMovies(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {/* Logout button */}
      <button onClick={logout}>Logout</button>

      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovies(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

