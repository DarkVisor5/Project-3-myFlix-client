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