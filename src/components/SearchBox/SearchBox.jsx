import { Search } from 'lucide-react';
import './SearchBox.css';

export default function SearchBox({ query, setQuery, onSearch }) {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="search-box">
      <div className="search-box__wrapper">
        <input
          type="text"
          className="search-box__input"
          placeholder="Search movies.."
          name="movie"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="search-box__btn" onClick={onSearch} aria-label="Search">
          <Search size={20} />
        </button>
      </div>
    </div>
  );
}