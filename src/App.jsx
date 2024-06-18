import { useEffect, useState } from "react";
import "./App.css";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";
import SearchBar from "./components/SearchBar";
import SortMenu from "./components/SortMenu";
import { fetchMovies, fetchPostersAndRatings } from "./utils/api";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortKey, setSortKey] = useState("release_date");
  const [loading, setLoading] = useState(false);

  const movieDetailsList = ["Poster", "opening_crawl", "director", "averageRating", "Ratings"];

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      setLoading(true);
      try {
        const movies = await fetchMovies();

        const moviesWithDetails = await Promise.all(
          movies.map(async (movie) => {
            try {
              const releaseDate = movie.release_date;
              if (!releaseDate) {
                console.warn(`Movie ${movie.title} does not have a release date`);
                return movie;
              }

              const releaseYear = releaseDate.substring(0, 4); // Extract the year from release date
              const details = await fetchPostersAndRatings(movie.title, releaseYear);

              if (details) {
                const averageRating = parseFloat(details.imdbRating);
                return { ...movie, ...details, averageRating };
              }
              return movie;
            } catch (error) {
              console.error(`Error fetching details for ${movie.title}:`, error);
              return movie;
            }
          }),
        );
        setMovies(moviesWithDetails);
        setFilteredMovies(moviesWithDetails);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetMovies();
  }, []);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleResultsUpdate = (filteredMovies) => {
    setFilteredMovies(filteredMovies);
  };

  const handleSortChange = (e, { value }) => {
    setSortKey(value);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-container">
          <SearchBar className="search-bar" movies={movies} onResultsUpdate={handleResultsUpdate} />
          <SortMenu className="sort-dropdown" sortKey={sortKey} onSortChange={handleSortChange} />
        </div>
      </header>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main className="main-content">
          <div className="box left-box">
            <Movies movies={filteredMovies} onMovieClick={handleSelectMovie} sortKey={sortKey} />
          </div>
          <div className="box right-box">
            <MovieDetails movie={selectedMovie} movieDetailsList={movieDetailsList}></MovieDetails>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
