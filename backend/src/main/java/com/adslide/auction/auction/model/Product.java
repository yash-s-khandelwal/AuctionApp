package com.adslide.auction.auction.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class Product {
    public Product() {
    }
    //this is the model for a product


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private String productName;
    private float minimumBid;

    @Column(columnDefinition = "TEXT")
    private String productDescription;

    private LocalDateTime auctionStartDate;
    private LocalDateTime auctionEndDate;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;
        // Getter methods for missing fields
        public Long getProductId() { return productId; }
        public String getProductName() { return productName; }
        public float getMinimumBid() { return minimumBid; }
        public String getProductDescription() { return productDescription; }
        public LocalDateTime getAuctionStartDate() { return auctionStartDate; }
        public LocalDateTime getAuctionEndDate() { return auctionEndDate; }
        public User getUser() { return user; }
}
