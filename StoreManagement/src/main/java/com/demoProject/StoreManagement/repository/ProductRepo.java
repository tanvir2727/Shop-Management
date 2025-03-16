package com.demoProject.StoreManagement.repository;

import com.demoProject.StoreManagement.Model.Product;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

    @Query("SELECT p from Product p  WHERE " +
            "LOWER(p.name) LIKE LOWER( CONCAT( :keyword,'%')) OR" +
            " LOWER(p.description) LIKE LOWER(CONCAT(   :keyword,'%')) OR" +
            " LOWER(p.brand) LIKE LOWER(CONCAT(:keyword ,'%') ) OR" +
            " LOWER(p.category) LIKE LOWER(CONCAT( :keyword ,'%')) " //search the result base on the start letter.
            //" LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword ,'%')) " //for search any where the letter is present.
    )
    List<Product> searchProducts(String keyword);

}
