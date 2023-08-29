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
          <span>{movie.author}</span>
        </div>
        <div>
          <span>Genre:</span>
          <span>{movie.genre}</span>
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