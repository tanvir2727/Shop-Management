package com.demoProject.StoreManagement.controller;


import com.demoProject.StoreManagement.Model.Product;
import com.demoProject.StoreManagement.dto.ProductDto;
import com.demoProject.StoreManagement.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class ProductController {


    @Autowired
    private ProductService service;

    @GetMapping("/")
    public String test(HttpSession session) {
        return "API is working!" + " Session ID: " + session.getId();
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable long id) {

        ProductDto product = service.getProductById(id);

        if(product != null){
            return new ResponseEntity<>(product, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //it will give me a token if I enable the spring security.
//    @GetMapping("/csrf-token")
//    public CsrfToken getCsrfToken(HttpServletRequest request){
//        return (CsrfToken) request.getAttribute("_csrf");
//    }

    @PostMapping(value = "/product", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(@RequestPart Product product,
                                        @RequestPart(required = false) MultipartFile imageFile) {
        try {

            Product savedProduct = service.addProduct(product, imageFile);

            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED); // Return saved product
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // Error response
        }
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable long id, @RequestPart Product product,
                                                @RequestPart MultipartFile imageFile) {
        Product product1 = null;
        try{
            product1 = service.updateProduct(id,product,imageFile);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(product1 != null){
            return new ResponseEntity<>("updated Product", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("updated Product", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable long id) {
        ProductDto product = service.getProductById(id);
        if(product != null){
            service.deleteProduct(id);
            return new ResponseEntity<>("deleted Product", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("deleted Product", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product/search")
    public ResponseEntity<List<Product>> searchProduct(@RequestParam String keyword){
        System.out.println("searching With "+keyword);
        List<Product> products = service.searchProduct(keyword);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
