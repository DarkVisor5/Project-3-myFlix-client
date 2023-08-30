import "./movie-view.scss";
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
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
            <button onClick={onBackClick} className="back-button">Back</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movie: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
