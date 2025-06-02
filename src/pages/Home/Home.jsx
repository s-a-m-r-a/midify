import { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import Filter from "../../components/Filter/Filter";
import MovieItem from "../../components/MovieItem/MovieItem";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
  let url = "";
  const trimmedQuery = query.trim();

  if (trimmedQuery && trimmedQuery.length < 3) {
    alert("Please enter at least 3 characters to search.");
    setMovies([]);
    return;
  }

  if (trimmedQuery) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=5b6aa098ca6a50e070ed4a4bbe11e49e&language=en-US&query=${trimmedQuery}`;
  } else if (selectedGenre) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=5b6aa098ca6a50e070ed4a4bbe11e49e&language=en-US&with_genres=${selectedGenre}`;
  } else {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=5b6aa098ca6a50e070ed4a4bbe11e49e&language=en-US&page=1`;
  }

  try {

    const res = await fetch(url);
    const data = await res.json();

    let results = data.results;

    if (trimmedQuery && selectedGenre) {
      results = results.filter(movie =>
        movie.genre_ids.includes(Number(selectedGenre))
      );
    }

    results = results.filter(movie =>
      movie.poster_path &&
      movie.release_date &&
      movie.vote_average &&
      movie.title
    );

    setMovies(results);
  } catch (err) {
    console.error("Error: fetch was unsuccessful.", err);
  }
};


  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
  fetchMovies();
}, [selectedGenre]);


  const handleSearch = () => {
    setHasSearched(true); 
    fetchMovies();
  };

  return (
    <>
      <div className="home-container">
        <div className="filters">
          <SearchBox query={query} setQuery={setQuery} onSearch={handleSearch} />
          <Filter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
        </div>

        <h2>Movies</h2>
        <div className="movies-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))
          ) : (
            hasSearched && <div className="not-found">Movie not found.</div>
            )}
            </div>
        </div>
      <Footer />
    </>
  );
}