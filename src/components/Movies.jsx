import "semantic-ui-css/semantic.min.css";
import {
    Rating,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "semantic-ui-react";
import "./Movies.css";
import PropTypes from "prop-types";

const Movies = ({ movies, onMovieClick, sortKey }) => {
    const sortedMovies = [...movies].sort((a, b) => {
        if (sortKey === "title") {
            return a[sortKey].localeCompare(b[sortKey]);
        }
        if (sortKey === "episode_id") {
            return a[sortKey] - b[sortKey];
        }
        if (sortKey === "averageRating") {
            return b[sortKey] - a[sortKey];
        }
        return new Date(a[sortKey]) - new Date(b[sortKey]);
    });

    return (
        <div className="movies">
            <Table basic="very" celled collapsing>
                <TableBody>
                    {sortedMovies.map((movie) => (
                        <TableRow
                            key={movie.episode_id} // Ensure each TableRow has a unique key
                            onClick={() => onMovieClick(movie)}
                            style={{ cursor: "pointer" }}
                        >
                            <TableCell singleLine>{`EPISODE ${movie.episode_id}`}</TableCell>
                            <TableCell singleLine>{movie.title}</TableCell>
                            <TableCell>
                                <Rating
                                    icon="star"
                                    rating={movie.averageRating}
                                    maxRating={10}
                                    disabled
                                />
                            </TableCell>
                            <TableCell>{movie.release_date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

Movies.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            episode_id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            averageRating: PropTypes.number.isRequired,
            release_date: PropTypes.string.isRequired,
        })
    ).isRequired,
    onMovieClick: PropTypes.func.isRequired,
    sortKey: PropTypes.string.isRequired,
};

export default Movies;
