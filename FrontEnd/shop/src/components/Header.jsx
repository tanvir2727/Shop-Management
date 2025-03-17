import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchProducts } from '../Service/ProductService';

const Header = () => {

    const [input, setInput] = useState("");
    // const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    // const [searchFocused, setSearchFocused] = useState(false);
    const navigate = useNavigate();


    // const handleChange = async (value) => {
    //     setInput(value);

    //     if (value.length >= 1) {
    //         setShowSearchResults(true);
    //         try {
    //             const results = await searchProducts(value);
    //             setSearchResults(results);
    //             setNoResults(results.length === 0);
    //             console.log(results);
    //         } catch (error) {
    //             console.error("Error searching:", error);
    //         }
    //     } else {
    //         setShowSearchResults(false);
    //         setSearchResults([]);
    //         setNoResults(false);
    //     }
    // };

    // const handleChange = async (value) => {
    //     setInput(value);

    //     try {
    //         const results = await searchProducts(value.trim());
    //         setSearchResults(results);
    //         setNoResults(results.length === 0);

    //         if (value.trim() === "") {
    //             setSearchResults([]);
    //             setNoResults(false);
    //         } else {
    //             // Redirect to search results page
    //             navigate("/search-results", { state: { results, noResults } });
    //         }
    //     } catch (error) {
    //         console.error("Error searching:", error);
    //     }
    // };

    useEffect(() => {

        const fetchResults = async () => {
            if (input.trim().length === 0) {
                setSearchResults([]);  // Clear search results if input is empty
                setNoResults(false);
                navigate("/");  // Redirect to home page
            } else {
                try {
                    const results = await searchProducts(input.trim());
                    setSearchResults(results);
                    setNoResults(results.length === 0);

                    // Navigate to search results page
                    navigate("/search-results", { state: { results, noResults } });
                } catch (error) {
                    console.error("Error searching:", error);
                }
            }
        };

        fetchResults(); // Call the function to get search results
    }, [input]);


    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">
                <Link to="/" className="hover:text-gray-900">My Shop</Link>
            </div>


            {/* <div>
                <input
                    className=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    type="search"
                    placeholder="Search products..."
                    aria-label="Search"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                />

                
                {showSearchResults && (
                    <ul className="absolute bg-white border border-gray-200 shadow-lg rounded-lg mt-1 z-10">
                        {searchResults.length > 0 ? (
                            searchResults.map((result) => (
                                <li key={result.id} className="border-b last:border-0">
                                    <a
                                        href={`/product/${result.id}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition duration-200"
                                    >
                                        {result.name}
                                    </a>
                                </li>
                            ))
                        ) : (
                            noResults && (
                                <li className="px-4 py-2 text-gray-500">No products found</li>
                            )
                        )}
                    </ul>
                )}
            </div> */}


            <div>
                <input
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    type="search"
                    placeholder="Search products..."
                    aria-label="Search"
                    value={input}
                    // onChange={(e) => handleChange(e.target.value)}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>


            <nav className="space-x-4">

                <Link to="/products" className="hover:text-gray-200">Products</Link>
                <Link to="/add-product" className="hover:text-gray-200">Add Product</Link>
                <Link to="/about" className="hover:text-gray-200">About</Link>
            </nav>
        </header>
    );
};

export default Header;
