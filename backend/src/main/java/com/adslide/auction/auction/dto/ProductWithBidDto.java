
package com.adslide.auction.auction.dto;

import java.util.List;

import com.adslide.auction.auction.model.Bid;
import com.adslide.auction.auction.model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductWithBidDto {
    // No explicit constructor needed; Lombok will generate both all-args and no-args constructors.
    //dto for a product details page that will return details with all bids placed on the product
    private Product product;
    private List<Bid> bids;

    // public ProductWithBidDto(Product product, List<Bid> bids) {
    //     this.product = product;
    //     this.bids = bids;
    // }
}