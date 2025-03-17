package com.demoProject.StoreManagement.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
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

    private String imageName;
    private String imageType;
    @Lob
    private String imageData;

}
