import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from './SearchResults';

const SearchResultsPage = () => {
    const location = useLocation();
    const { results, noResults } = location.state || {};

    return (
        <div>
            <SearchResults searchResults={results} noResults={noResults} />
        </div>
    );
};

export default SearchResultsPage;
