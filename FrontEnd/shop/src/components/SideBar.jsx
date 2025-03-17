import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaList } from 'react-icons/fa';

const SideBar = () => {
    const navigate = useNavigate();

    const handleCreateProduct = () => {
        navigate('/add-product');
    };

    const handleAllProducts = () => {
        navigate('/products');
    };

    return (
        <div className="h-full bg-[#80CBC4] text-white w-64 flex flex-col items-start py-4">
            <div className="w-full px-4">
                <ul className="space-y-4">
                    {/* All Products Link */}
                    <li
                        className="sidebar-item cursor-pointer flex items-center space-x-3 text-lg font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={handleAllProducts}
                    >
                        <FaList className="text-xl" />
                        <span>All Products</span>
                    </li>

                    {/* Add Product Link */}
                    <li
                        className="sidebar-item cursor-pointer flex items-center space-x-3 text-lg font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={handleCreateProduct}
                    >
                        <FaPlus className="text-xl" />
                        <span>Add Product</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
