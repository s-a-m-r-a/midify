import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Filter.css';

export default function Filter({ selectedGenre, setSelectedGenre }) {
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=5b6aa098ca6a50e070ed4a4bbe11e49e&language=en-US`);
      const data = await res.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setIsOpen(false);
  };

  const selectedGenreName = genres.find(g => g.id === Number(selectedGenre))?.name || 'All Genres';

  return (
    <div className="genre-filter">
      <div className="genre-filter__dropdown" onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedGenreName}</span>
        <ChevronDown size={20} className={`genre-filter__icon ${isOpen ? 'open' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="genre-filter__options">
          <div 
            className={`genre-filter__option ${!selectedGenre ? 'selected' : ''}`}
            onClick={() => handleGenreClick('')}
          >
            All Genres
          </div>
          {genres.map((genre) => (
            <div
              key={genre.id}
              className={`genre-filter__option ${Number(selectedGenre) === genre.id ? 'selected' : ''}`}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}