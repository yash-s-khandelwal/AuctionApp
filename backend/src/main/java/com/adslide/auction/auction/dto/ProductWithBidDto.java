package com.adslide.auction.auction.dto;

import java.util.List;

import com.adslide.auction.auction.model.Bid;
import com.adslide.auction.auction.model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductWithBidDto {
    private Product product;
    private List<Bid> bids;
}
