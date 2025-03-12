package com.demoProject.StoreManagement.service;

import com.demoProject.StoreManagement.Model.Product;
import com.demoProject.StoreManagement.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
