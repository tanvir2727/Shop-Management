import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getProductsById, deleteProduct } from '../Service/ProductService';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


const ProductDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fatchProduct = async () => {
            if (id) {
                const data = await getProductsById(id);
                setProduct(data);
            }
        }
        fatchProduct();
    }, [id])

    const handleDelete = async (productId) => {
        try {
            const response = await deleteProduct(productId); // Call deleteProduct from service
            if (response) {
                alert("Product deleted successfully!");
                navigate('/'); // Redirect to products page after deletion
            } else {
                alert("Failed to delete product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };



    if (!product) return <p>Loading...</p>;

    const image = product.imageData ? product.imageData : "https://via.placeholder.com/400";

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-lg mx-auto p-6 bg-[#574964] shadow-md rounded-lg flex">
                {/* Image Section */}
                <div className="w-1/3">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Product Details Section */}
                <div className="w-2/3 pl-6">
                    <h1 className="text-xl font-bold text-white">{product.name}</h1>
                    <p className="text-gray-400">Price: ${product.price}</p>
                    <p className="text-gray-400">Quantity: {product.quantity}</p>
                    <p className="text-gray-400">Category: {product.category}</p>
                    <p className="text-gray-400">Description: {product.description}</p>
                    <p className="text-gray-400">Date: {product.creatDate}</p>

                    {/* Buttons Section */}
                    <div className="flex justify-between mt-4">
                        <button
                            className="flex items-center justify-center w-1/2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the card's click
                                navigate(`/edit-product/${id}`); // Navigate to the update product page
                            }}
                        >
                            <FaEdit className="mr-2" /> Update
                        </button>
                        <button
                            className="flex items-center justify-center w-1/2 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the card's click
                                handleDelete(id); // Call delete function
                            }}
                        >
                            <FaTrashAlt className="mr-2" /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
