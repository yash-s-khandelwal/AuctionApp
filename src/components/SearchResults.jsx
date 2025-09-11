import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get('query');
  // Replace with real search logic
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Results</h2>
      <p>Showing results for: <b>{query}</b></p>
      {/* Render search results here */}
    </div>
  );
};

export default SearchResults;
