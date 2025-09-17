    
package com.adslide.auction.auction.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllProductListDto {
    //dto for only sending required data for product pages
    Long productId;
    String productName;
    float price;
    // String imagePath;
    LocalDateTime auctionStartDate;
    LocalDateTime auctionEndDate;

    // No explicit constructor needed; Lombok will generate both all-args and no-args constructors.
    // public AllProductListDto(Long productId, String productName, float price, LocalDateTime auctionStartDate, LocalDateTime auctionEndDate) {
    //     this.productId = productId;
    //     this.productName = productName;
    //     this.price = price;
    //     this.auctionStartDate = auctionStartDate;
    //     this.auctionEndDate = auctionEndDate;
    // }
}