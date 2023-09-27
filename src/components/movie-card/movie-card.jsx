import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './movie-card.scss';

export const MovieCard = ({ movie, onAddToFavorites, onRemoveFromFavorites, initialIsFavorite, simplified }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite || false);
  const [isTruncated, setIsTruncated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const toggleFavorite = (event, movieId) => {
    event.stopPropagation();
    if (isFavorite) {
      onRemoveFromFavorites(movieId);
    } else {
      onAddToFavorites(movieId);
    }
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/movies/${movie._id}`);
  };

  const handleReadMore = (event) => {
    event.stopPropagation();
    setIsTruncated(!isTruncated);
  };

  const genreNames = movie.genre.map(g => g.name).join(', ');

  const truncatedDescription = isTruncated ? `${movie.description.substring(0, 100)}...` : movie.description;
  
  return (
    <div className="movie-card-container">
      <Card className="h-100" onClick={handleCardClick}>
        <div className="image-container">
          <Card.Img variant="Top" src={movie.image_url} className="movie-image" />
            <div className="heart-icon" onClick={(event) => toggleFavorite(event, movie._id)}>
              {isFavorite ? (
                <span className="filled-heart">❤</span>
              ) : (
                <span className="empty-heart">♡</span>
              )}
            </div>
        </div>
        <Card.Body>
          <Card.Title className="title">{movie.title}</Card.Title>
          {!simplified && (
            <Card.Text className="description">
              {truncatedDescription} <span className="read-more" onClick={(event) => handleReadMore(event)}>{isTruncated ? 'Read more' : 'Read less'}</span>
            </Card.Text>
          )}
          <div className="genre">{genreNames}</div>
        </Card.Body>
      </Card>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    image_url: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    }))
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
  initialIsFavorite: PropTypes.bool,
  simplified: PropTypes.bool
};
