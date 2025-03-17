import React from 'react'
import { useNavigate } from 'react-router'

const Card = ({ id, name, price, quantity, image }) => {

    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        // Get existing cart from local storage or initialize an empty array
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the product already exists in the cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            // If the product exists, increase the quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // If not, add the product with quantity 1
            cart.push({ ...product, quantity: 1 });
        }

        // Save the updated cart back to local storage
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Product added to cart!");
    };




    return (
        <div className="max-w-xs bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div onClick={() => navigate(`/product/${id}`)}>
                <div >
                    <img
                        src={image ? image : "https://via.placeholder.com/300"}
                        alt={name}
                        className="w-full h-48 object-cover"
                    />
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-4">
                    {name}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Price:</span> ${price}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Quantity:</span> {quantity}
                </div>
            </div>
            <div className="text-center">
                <button className="w-full py-2 px-4 bg-[#F2B28C] text-white rounded-lg hover:bg-[#D2665A] focus:outline-none"
                    onClick={() => handleAddToCart({id, name, price, quantity, image})}
                >
                    Add to Cart
                </button>
            </div>

        </div>
    )
}

export default Card
