import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ searchResults, noResults }) => {
    return (
        <div className="container mx-auto mt-4">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <ul className="space-y-4">
                {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <li key={result.id} className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
                            <Link to={`/product/${result.id}`} className="flex items-center gap-4 p-4">
                                {/* Product Image */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={result.imageData}
                                        alt={result.name}
                                        className="w-24 h-24 object-cover rounded-md" // Adjust the image size
                                    />
                                </div>

                                {/* Product Information */}
                                <div className="flex flex-col justify-between">
                                    <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition duration-200">{result.name}</h3>
                                    <p className="text-sm text-gray-600">{result.brand}</p>
                                    <p className="text-xl font-bold text-green-600">${result.price}</p>
                                </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    noResults && <li className="text-gray-500">No products found</li>
                )}
            </ul>
        </div>
    );
};

export default SearchResults;
