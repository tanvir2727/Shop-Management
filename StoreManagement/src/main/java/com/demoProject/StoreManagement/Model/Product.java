package com.demoProject.StoreManagement.Model;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;
    private String brand;
    private BigDecimal price;
    private String category;
    private String description;

    private Date creatDate;
    private boolean available;
    private int quantity;

    private String imageName;
    private String imageType;
    @Lob
    private String imageData;

}
