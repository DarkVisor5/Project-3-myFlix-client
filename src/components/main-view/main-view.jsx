import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id:1,
        title: "The Gladiator",
        image:
            "https://m.media-amazon.com/images/I/61MSIFHAxML._AC_UF1000,1000_QL80_.jpg",
        author: "Ridley Scott",
        genre:"Historical drama, Action, Adventure",
        description: "Set in Ancient Rome and follows the life of Maximus Decimus Meridius, a Roman General who is betrayed and comes to Rome as a gladiator to seek revenge against Commodus, the corrupt heir to his father's throne."
    },
    {
        id:2,
        title: "Inception",
        image:
            "https://m.media-amazon.com/images/I/71SBgi0X2KL._AC_UF894,1000_QL80_.jpg",
        author: "Christopher Nolan",
        genre:"Science Fiction, Drama, Adventure",
        description:"Explores the adventures of a group of astronauts who travel through a wormhole near Saturn in search of a new habitable planet for humanity, as Earth is dying due to environmental collapse. The film delves into concepts like black holes, time dilation, and the emotional toll of space travel."
    },
    {
        id:3,
        title: "Interstellar",
        image: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._AC_UF894,1000_QL80_.jpg",
        author: "Christopher Nolan",
        genre: "Science Fiction, Action, Thriller",
        description:"Is about a skilled thief named Dom Cobb who specializes in the art of extracting secrets from people's minds while they are dreaming. Offered a chance to redeem himself, he and his team are hired to implant an idea into a target's subconscious, a task known as inception."
    }
  ]);

  const [selectedMovies, setSelectedMovies] = useState(null);

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
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovies(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};