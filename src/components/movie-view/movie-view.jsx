import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";
import { Container, Row, Col } from 'react-bootstrap';

export const MovieView = ({ movies, onBackClick }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  if(!movie){
    return <div>Movie not found</div>
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8} style={{ border: "1px solid black" }}>
          <div>
            <div>
              <img src={movie.image_url} alt={movie.title} className="w-100"/>
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
              <span>Genre: </span>
              <span>{movie.genre.map(g => g.name).join(', ')}</span>
            </div>
            <div>
              <span>Description: </span>
              <span>{movie.description}</span>
            </div>
            <Link to={`/`}>
              <button className="back-button">Back</button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
