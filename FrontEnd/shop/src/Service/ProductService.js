import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductsById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  export const addProduct = async (product, imageFile) => {
    try {
      const formData = new FormData();
      // formData.append("product", new Blob([JSON.stringify({...product})], { type: "application/json" }));
      formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
      
      if(imageFile) formData.append("imageFile", imageFile);
      console.log(product, imageFile);
      
  
      const response = await axios.post(`${API_URL}/product`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      return null;
    }
  };

  export const updateProduct = async (id, product, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("product", new Blob([JSON.stringify(product )], { type: "application/json" }));
      if (imageFile) formData.append("imageFile", imageFile);
  
      const response = await axios.put(`${API_URL}/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  };

  export const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/product/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      return null;
    }
  };

  export const searchProducts = async (keyword) => {
    try {
        const response = await axios.get(`${API_URL}/product/search?keyword=${keyword}`);
        return response.data;
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
};
  