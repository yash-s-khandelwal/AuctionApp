package com.adslide.auction.auction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adslide.auction.auction.model.Product;
import com.adslide.auction.auction.service.ProductService;

@RestController
@RequestMapping("/api/v0")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping("/allProducts")
    public List<Product> ProductDetails(){
        return productService.getAllProducts();
    }
}
