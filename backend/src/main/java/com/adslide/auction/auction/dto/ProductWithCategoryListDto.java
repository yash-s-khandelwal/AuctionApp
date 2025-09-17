
package com.adslide.auction.auction.dto;

import java.util.List;

import com.adslide.auction.auction.model.CategoryLink;
import com.adslide.auction.auction.model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductWithCategoryListDto {
    private Product productDetails;
    private List<CategoryLink> productCategoryLink;

    public ProductWithCategoryListDto(List<CategoryLink> productCategoryLink, Product productDetails) {
        this.productCategoryLink = productCategoryLink;
        this.productDetails = productDetails;
    }

    public Product getProductDetails() {
        return productDetails;
    }

    public List<CategoryLink> getProductCategoryLink() {
        return productCategoryLink;
    }
}
