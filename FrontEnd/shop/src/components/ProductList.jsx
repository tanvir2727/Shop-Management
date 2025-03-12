import React, { useEffect, useState } from 'react'
import { getProducts } from '../Service/ProductService';
import Card from './Card';

const ProductList = () => {

    const [products, setproducts] = useState([]);
    const [isError, setIsError] = useState(false)

    useEffect(() => {

        const fatchProduct = async () => {
            try {
                const data = await getProducts();
                setproducts(data);
            } catch (error) {
                console.log("error fetching data: ", error);
                setIsError(true);
            }
        };

        fatchProduct();
    }, [])

    return (
        <>
            <div className="flex justify-center items-center min-h-screen min-w-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductList
