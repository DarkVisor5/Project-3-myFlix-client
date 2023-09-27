<<<<<<< HEAD
<<<<<<< Updated upstream
export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Author: </span>
          <span>{movie.director.name}</span>
        </div>
        <div>
          <span>Genre:</span>
          <span>{movie.genre.map(g => g.name).join(', ')}</span>
        </div>
        <div>
          <span>Description:</span>
          <span>{movie.description}</span>
        </div>
        <div>
          <img src={movie.image_url} alt={movie.title} />
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
=======
// MovieView.jsx
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MovieCard } from '../movie-card/movie-card';
import "./movie-view.scss";
import { Container, Row, Col } from 'react-bootstrap';

export const MovieView = ({ movies, onAddToFavorites, onRemoveFromFavorites, favoriteMovies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found</div>
  }
  
  const getSimilarMovies = (currentMovie, allMovies) => {
    const currentGenres = currentMovie.genre.map(g => g.name);
    return allMovies.filter(
      movie => movie._id !== currentMovie._id && 
               currentGenres.some(genre => movie.genre.map(g => g.name).includes(genre))
    );
  };
=======
// MovieView.jsx
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MovieCard } from '../movie-card/movie-card';
import "./movie-view.scss";
import { Container, Row, Col } from 'react-bootstrap';

export const MovieView = ({ movies, onAddToFavorites, onRemoveFromFavorites, favoriteMovies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found</div>
  }
  
  const getSimilarMovies = (currentMovie, allMovies) => {
    const currentGenres = currentMovie.genre.map(g => g.name);
    return allMovies.filter(
      movie => movie._id !== currentMovie._id && 
               currentGenres.some(genre => movie.genre.map(g => g.name).includes(genre))
    );
  };
>>>>>>> fd1a08dd06cd3887245f0f953e0d0f62190ce288

  const similarMovies = getSimilarMovies(movie, movies);

  return (
    <Container fluid>
      <Row className="justify-content-md-center movie-view-row">
        <Col sm={6} className="text-column">
          <div className="movie-title">{movie.title}</div>
          <div className="director-and-genre">
            <div className="movie-director">{movie.director.name}</div>
            <div className="movie-genre">{movie.genre.map(g => g.name).join(', ')}</div>
          </div>
          <div className="movie-description">{movie.description}</div>
        </Col>
        <Col sm={6} className="image-column">
          <img src={movie.image_url} alt={movie.title} className="movie-image"/>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Link to={`/`}>
            <button className="back-button btn btn-primary">Back</button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <div className="similar-movies-section">
            <h2>Similar Movies</h2>
            <Row>
              {similarMovies.map(similarMovie => (
                  <Col md={3} key={similarMovie._id}>
                    <MovieCard
                      movie={similarMovie}
                      onAddToFavorites={onAddToFavorites}
                      onRemoveFromFavorites={onRemoveFromFavorites}
                      initialIsFavorite={favoriteMovies.includes(similarMovie._id)}
                    />
                  </Col>
            ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
};




<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> fd1a08dd06cd3887245f0f953e0d0f62190ce288
