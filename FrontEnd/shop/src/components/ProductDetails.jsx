import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getProductsById, deleteProduct } from '../Service/ProductService';


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
            <div className="max-w-lg mx-auto p-6 bg-gray-900 shadow-md rounded-lg">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-cover"
                />
                <h1 className="text-xl font-bold">{product.name}</h1>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                <p className="text-gray-600">Category: {product.category}</p>
                <p className="text-gray-600">Description: {product.description}</p>
                <p className="text-gray-600">Date: {product.creatDate}</p>
                <div className="flex justify-between">
                    <button
                        className="w-1/2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the card's click
                            navigate(`/edit-product/${id}`); // Navigate to the update product page
                        }}
                    >
                        Update
                    </button>
                    <button
                        className="w-1/2 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the card's click
                            handleDelete(id); // Call delete function
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
