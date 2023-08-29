import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    console.log("MovieCard movie:", movie);  // Add logging
    return (
      <div
        onClick={() => {
          console.log("Clicked on movie:", movie);
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };

MovieCard.propTypes={
  movie: PropTypes.shape({
    title:PropTypes.string.isRequired,
    author:PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}