package com.adslide.auction.auction.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name="product")
public class Product {
    public Product(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productID;
    private String productName;
    private float minimumBid;
    

    @Column(columnDefinition="TEXT")
    private String productDescription;

    private LocalDateTime auctionStartDate;
    private LocalDateTime auctionEndDate;
}
