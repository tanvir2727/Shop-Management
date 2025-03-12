import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getProductsById } from '../Service/ProductService';

const ProductDetails = () => {

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

    if (!product) return <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen">
            <div className="max-w-lg mx-auto p-6 bg-gray-900 shadow-md rounded-lg">
                <h1 className="text-xl font-bold">{product.name}</h1>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                <p className="text-gray-600">Category: {product.category}</p>
                <p className="text-gray-600">Description: {product.description}</p>
                <p className="text-gray-600">Date: {product.creatDate}</p>
            </div>
        </div>
    )
}

export default ProductDetails
