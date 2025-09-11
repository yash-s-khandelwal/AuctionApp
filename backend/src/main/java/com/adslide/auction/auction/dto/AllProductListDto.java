package com.adslide.auction.auction.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AllProductListDto {
    Long productId;
    String productName;
    float price;
    // String imagePath;
    LocalDateTime auctionStartDate;
    LocalDateTime auctionEndDate;

}
