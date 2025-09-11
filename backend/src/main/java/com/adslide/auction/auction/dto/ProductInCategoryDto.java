package com.adslide.auction.auction.dto;

import java.util.List;

import com.adslide.auction.auction.model.Category;
import com.adslide.auction.auction.model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductInCategoryDto {
    private Category category;
    private List<Product> productList;

}
