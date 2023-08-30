import PropTypes from "prop-types";
import {Button, Card } from "react-bootstrap";


export const MovieCard = ({ movie, onMovieClick }) => {
    console.log("MovieCard movie:", movie);  // Add logging
    return (
      <Card className="h-100">
        <Card.Img variant="Top" src={movie.image_url} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            Director: {movie.director.name}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  };

MovieCard.propTypes={
  movie: PropTypes.shape({
    title:PropTypes.string.isRequired,
    author:PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}

