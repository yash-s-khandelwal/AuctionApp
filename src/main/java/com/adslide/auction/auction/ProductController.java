package com.adslide.auction.auction;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    @GetMapping("/api/v0/product/{id}")
    public String ProductDetails(@PathVariable("id") String ProductID){
        return "Hello, the product id is" + ProductID;
    }
}
