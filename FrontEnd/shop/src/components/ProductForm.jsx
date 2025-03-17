import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { addProduct, getProductsById, updateProduct } from '../Service/ProductService';

const ProductForm = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        brand: "",
        category: "",
        available: true,
        quantity: 1,
        creatDate: new Date().toISOString().split("T")[0],
    })

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!id) return;

        getProductsById(id)
            .then((data) => {
                setProduct({
                    name: data.name || "",
                    price: data.price || "",
                    description: data.description || "",
                    brand: data.brand || "",
                    category: data.category || "",
                    available: data.available ?? false,
                    quantity: data.quantity || 1,
                    creatDate: data.creatDate?.split("T")[0] || "",
                });
                // Check if there's an imageData and set the image preview
                if (data.imageData) {
                    setImagePreview(data.imageData);  // Set image preview from base64
                }
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setError("Failed to load product data");
            });
    }, [id]);


    const validate = () => {
        let newError = {};

        if (!product.name.trim()) newError.name = "Name is require";
        if (!product.price || isNaN(product.price) || product.price <= 0)
            newError.price = "Price is require and must be a positive number";
        if (!product.description.trim()) newError.description = "Description is Require";
        if (!product.brand.trim()) newError.brand = "Brand is Require"
        if (!product.category.trim()) newError.brand = "Category is Require";
        if (product.quantity < 1) newError.quantity = "Quantity must be at least 1";
        if (!imageFile) newError.image = "Product image is required";

        setErrors(newError);
        return Object.keys(newError).length === 0;
    }



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prev) => ({
            ...prev,
            // [name]: type === "checkBox" ? checked : value
            [name]: type === "checkBox" ? checked : type === "number" ? Number(value) : value
        }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file); // Store actual file for upload
        setImagePreview(URL.createObjectURL(file));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!validate()) {
            setLoading(false);
            return;
        }

        try {
            if (id) {
                await updateProduct(id, product, imageFile);
            } else {
                await addProduct(product, imageFile);
            }
            navigate("/");
        } catch (error) {
            setError("Failed to save product");
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen ">
                <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">{id ? "Edit Product" : "Add Product"}</h2>
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-600">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-600">Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                            {errors.price && <p className="text-red-500">{errors.price}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-600">Description:</label>
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                            {errors.description && <p className="text-red-500">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600">Brand:</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={product.brand}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                                />
                                {errors.brand && <p className="text-red-500">{errors.brand}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-600">Category:</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                                />
                                {errors.category && <p className="text-red-500">{errors.category}</p>}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="available"
                                checked={product.available}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-500"
                            />
                            <label className="text-gray-600">Available</label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600">Quantity:</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={product.quantity}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                                />
                                {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-600">Created Date:</label>
                                <input
                                    type="date"
                                    name="creatDate"
                                    value={product.creatDate}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600">Product Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            />
                            {errors.image && <p className="text-red-500">{errors.image}</p>}
                        </div>

                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-gray-600">Image Preview:</p>
                                <img src={imagePreview} alt="Preview" className="w-36 h-36 object-cover rounded-md shadow-md" />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 text-white font-semibold rounded-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                        >
                            {loading ? "Saving..." : id ? "Update Product" : "Add Product"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductForm
