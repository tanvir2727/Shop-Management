import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">
                <Link to="/" className="hover:text-gray-900">My Shop</Link>
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
