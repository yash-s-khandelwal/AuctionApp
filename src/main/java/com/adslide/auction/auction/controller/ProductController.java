package com.adslide.auction.auction.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adslide.auction.auction.model.Product;
import com.adslide.auction.auction.service.ProductService;

@RestController
@RequestMapping("/api/v0/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/test")
    public String testcheck(){
        return "working";
    }


    @GetMapping("/allProducts")
    public List<Product> productDetails(){
        return productService.getAllProducts();
    }

    @GetMapping("/getProduct/{productId}")
    public Optional<Product> getProductById(@PathVariable Long productId){
        return productService.getProductById(productId);
    }

    @PostMapping("/createProduct")
    public ResponseEntity<String> createProduct(@RequestBody Product newProduct){
        return productService.createProduct(newProduct);
           
    }
    @DeleteMapping("/deleteProduct/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId){
        return productService.deleteProduct(productId);
    }
}
