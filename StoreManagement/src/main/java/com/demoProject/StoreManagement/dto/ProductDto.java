package com.demoProject.StoreManagement.dto;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String brand;
    private String price;
    private String category;
    private String description;

    private String creatDate;
    private Boolean available;
    private String quantity;
}
