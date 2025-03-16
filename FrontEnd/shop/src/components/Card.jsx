import React from 'react'
import { useNavigate } from 'react-router'

const Card = ({ id, name, price, quantity, image }) => {

    const navigate = useNavigate();



    return (
        <div className="max-w-xs bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            // eslint-disable-next-line no-undef
            onClick={() => navigate(`/product/${id}`)} >
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
            <div className="text-center">
                <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                    Add to Cart
                </button>
            </div>

        </div>
    )
}

export default Card
