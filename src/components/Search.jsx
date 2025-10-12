import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/slices/debtsSlice';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchQuery(value));
  };

  const clearSearch = () => {
    setQuery('');
    dispatch(setSearchQuery(''));
  };

  return (
    <div className="w-full h-10 relative">
      <input
        type="text"
        placeholder="Поиск клиентов..."
        value={query}
        onChange={handleSearch}
        className="w-full h-10 text-sm py-1 px-3 pr-8 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-300"
      />
      {query && (
        <button
          onClick={clearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Search;