package com.demoProject.StoreManagement.service;

import com.demoProject.StoreManagement.Model.Product;
import com.demoProject.StoreManagement.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<Product> getAllProducts(){
        return productRepo.findAll();
    }

    public Product getProductById(long id) {
        return productRepo.findById(id).get();
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
//        product.setImageName(imageFile.getOriginalFilename());
//        product.setImageType(imageFile.getContentType());
//        String base64Image = "data:" + imageFile.getContentType() + ";base64," + Base64.getEncoder().encodeToString(imageFile.getBytes());
//
//        // Set the base64 image data in the product
//        product.setImageData(base64Image);

        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            String base64Image = "data:" + imageFile.getContentType() + ";base64," + Base64.getEncoder().encodeToString(imageFile.getBytes());
            product.setImageData(base64Image);
        }

        return productRepo.save(product);
    }

    public Product updateProduct(long id, Product product, MultipartFile imageFile) throws IOException {
        // Check if the product exists in the database
        Optional<Product> existingProductOpt = productRepo.findById(id);

        if (existingProductOpt.isEmpty()) {
            throw new RuntimeException("Product with ID " + id + " not found.");
        }

        Product existingProduct = existingProductOpt.get();

        // Update only the necessary fields
        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setAvailable(product.isAvailable());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setCreatDate(product.getCreatDate());

        // Handle image update
//        if (imageFile != null && !imageFile.isEmpty()) {
//            existingProduct.setImageData(Base64.getEncoder().encodeToString(imageFile.getBytes()));
//            existingProduct.setImageName(imageFile.getOriginalFilename());
//            existingProduct.setImageType(imageFile.getContentType());
//        } else {
//            existingProduct.setImageData(existingProduct.getImageData());
//            existingProduct.setImageName(existingProduct.getImageName());
//            existingProduct.setImageType(existingProduct.getImageType());
//        }
        if (imageFile != null && !imageFile.isEmpty()) {
            existingProduct.setImageName(imageFile.getOriginalFilename());
            existingProduct.setImageType(imageFile.getContentType());
            String base64Image = "data:" + imageFile.getContentType() + ";base64," + Base64.getEncoder().encodeToString(imageFile.getBytes());
            existingProduct.setImageData(base64Image);
        }

        return productRepo.save(existingProduct);
    }


    public void deleteProduct(long id) {
        if (!productRepo.existsById(id)) {
            throw new RuntimeException("Product with ID " + id + " not found.");
        }

        productRepo.deleteById(id);
    }
}
