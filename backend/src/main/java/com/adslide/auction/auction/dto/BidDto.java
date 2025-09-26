package com.adslide.auction.auction.dto;

import com.adslide.auction.auction.model.Product;
import lombok.Data;

@Data
public class BidDto {
    Long bidId;
float price;
String bidStatus;
ProductListDto product;
}
