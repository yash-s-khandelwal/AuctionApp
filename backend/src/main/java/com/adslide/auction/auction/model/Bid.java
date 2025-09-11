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
@Table(name="Bid")
public class Bid {
    public Bid(){}
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long bidId;

    private float price;

    @ManyToOne
    @JoinColumn(name="userId", referencedColumnName="userId")
    private User user;

    @ManyToOne
    @JoinColumn(name="productId", referencedColumnName="productId")
    private Product product;


}
