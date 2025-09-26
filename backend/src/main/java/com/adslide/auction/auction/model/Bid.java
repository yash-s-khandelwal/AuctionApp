package com.adslide.auction.auction.model;

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
@Table(name = "Bid")
// bid entity for placing bids
public class Bid {

    // Getter methods for missing fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bidId;

    private float price;

    private String bidStatus;
    private String razorpayPaymentId;
    private String razorpayOrderId;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "productId", referencedColumnName = "productId")
    // @com.fasterxml.jackson.annotation.JsonIgnore
    private Product product;


}
