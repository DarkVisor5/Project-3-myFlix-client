import { useState,useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    // fetch data from API
    fetch("https://testmovieapi.onrender.com/movies")
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.log(error));
  }, []);
  
  const [selectedMovies, setSelectedMovies] = useState(null);

  if (selectedMovies) {
    console.log("Selected Movie:", selectedMovies);
    return (
      <MovieView movie={selectedMovies} onBackClick={() => setSelectedMovies(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
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