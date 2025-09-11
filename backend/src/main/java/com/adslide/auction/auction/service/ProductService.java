package com.adslide.auction.auction.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.adslide.auction.auction.model.Product;
import com.adslide.auction.auction.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public ResponseEntity<String> createProduct(Product newProduct) {
        productRepository.saveAndFlush(newProduct);
        return new ResponseEntity<>("New Product Created", HttpStatus.OK);
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
