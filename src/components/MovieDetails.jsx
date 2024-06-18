import { Label, Rating } from "semantic-ui-react";
import "./MovieDetails.css";
import PropTypes from "prop-types";

const MovieDetails = ({ movie, movieDetailsList }) => {
  const imdbUrl = movie ? `https://www.imdb.com/title/${movie.imdbID}/` : "#";

  return (
    <div className="movie-details">
      {!movie ? (
        <div> Please select a movie to see the details. </div>
      ) : (
        <div>
          <h2>
            <a href={imdbUrl} target="_blank" rel="noopener noreferrer">
              {movie.Title}
            </a>
          </h2>
          <div className="details-container">
            {movie.Poster && (
              <div className="poster">
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
              </div>
            )}
            <div className="info">
              {movie.opening_crawl && (
                <div className="crawl">
                  <p>{movie.opening_crawl}</p>
                </div>
              )}
              <ul>
                {Object.entries(movie)
                  .filter(
                    ([key]) =>
                      movieDetailsList.includes(key) &&
                      key !== "Poster" &&
                      key !== "opening_crawl"
                  )
                  .map(([key, value]) => {
                    if (key === "Ratings") {
                      return (
                        <li key={key}>
                          <h3>Ratings:</h3>
                          <ul>
                            {value.map((rating) => (
                              <div key={rating.Source}>
                                <Label key={movie.episode_id} as="a" basic color="blue">
                                  {rating.Source}: {rating.Value}
                                </Label>
                              </div>
                            ))}
                          </ul>
                        </li>
                      );
                    } else if (key === "averageRating") {
                      return (
                        <li key={key}>
                          <strong>Average rating: </strong>
                          <Rating
                            key={movie.episode_id}
                            icon="star"
                            rating={movie.averageRating}
                            maxRating={10}
                            disabled
                          />
                        </li>
                      );
                    } else {
                      return null; // Return null for keys that don't match
                    }
                  })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    episode_id: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    opening_crawl: PropTypes.string,
    director: PropTypes.string,
    averageRating: PropTypes.number,
    Ratings: PropTypes.arrayOf(
        PropTypes.shape({
          Source: PropTypes.string.isRequired,
          Value: PropTypes.string.isRequired,
        })
    ),
    imdbID: PropTypes.string,
  }),
  movieDetailsList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieDetails;
