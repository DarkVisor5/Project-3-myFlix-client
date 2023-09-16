import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onAddToFavorites, initialIsFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleAddToFavorites = (title) => {
    setIsFavorite(!isFavorite);
    onAddToFavorites(title);
  };

  return (
    <Card className="h-100">
      <Card.Img variant="Top" src={movie.image_url} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          Director: {movie.director.name}
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button
        variant={isFavorite ? "danger" : "primary"}
        onClick={() => handleAddToFavorites(movie.title)}
      >
        &hearts; {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    image_url: PropTypes.string.isRequired
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  initialIsFavorite: PropTypes.bool
};
