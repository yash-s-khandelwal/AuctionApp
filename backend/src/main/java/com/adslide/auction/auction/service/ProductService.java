package com.adslide.auction.auction.service;

import java.util.List;
import java.util.Optional;

import com.adslide.auction.auction.dto.ProductWithCategoryListDto;
import com.adslide.auction.auction.model.CategoryLink;
import com.adslide.auction.auction.repository.CategoryLinkRepository;
import com.adslide.auction.auction.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.adslide.auction.auction.model.Product;
import com.adslide.auction.auction.repository.ProductRepository;

@Service
public class ProductService {
    //all methods do what is stated in their name

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryLinkRepository categoryLinkRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //this method will return a new product with all the categories that the product owner adds to it.
    public ProductWithCategoryListDto createProduct(ProductWithCategoryListDto productWithCategoryListDto) {
        Product productDetails = productWithCategoryListDto.getProductDetails();
        List<CategoryLink> productCategoryLinks = productWithCategoryListDto.getProductCategoryLink();
        return new ProductWithCategoryListDto(
                        productRepository.saveAndFlush(productDetails),
                        categoryLinkRepository.saveAllAndFlush(productCategoryLinks));


    }

    public ResponseEntity<String> deleteProduct(Long productId) {
        productRepository.deleteById(productId);
        return new ResponseEntity<>("product deleted", HttpStatus.OK);
    }

    public Optional<Product> getProductDetailsById(Long productId) {
        return productRepository.findById(productId);
    }

    public String updateProductDetails(Product updatedProductDetails) {
        Optional<Product> productOriginal = productRepository.findById(updatedProductDetails.getProductId());
        if (productOriginal.isPresent()) {
            productRepository.saveAndFlush(updatedProductDetails);
            return "updated product details";

        } else {
            return "No such product found";
        }
    }

    public ResponseEntity<List<Product>> createProductsInBatch(List<Product> productList) {
        return new ResponseEntity<>(productRepository.saveAllAndFlush(productList), HttpStatus.CREATED);
    }

}
