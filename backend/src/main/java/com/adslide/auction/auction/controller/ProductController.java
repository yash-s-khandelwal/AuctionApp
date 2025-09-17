package com.adslide.auction.auction.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.adslide.auction.auction.dto.ProductWithCategoryListDto;
import com.adslide.auction.auction.model.CategoryLink;
import com.adslide.auction.auction.service.ImageHandlingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import com.adslide.auction.auction.dto.AllProductListDto;
import com.adslide.auction.auction.dto.ProductWithBidDto;
import com.adslide.auction.auction.model.Bid;
import com.adslide.auction.auction.model.Product;
import com.adslide.auction.auction.service.BidService;
import com.adslide.auction.auction.service.ProductService;

@RestController
@RequestMapping("/api/v0/product")
public class ProductController {

    // this class has apis for getting all products, getting a single product
    // details, creating a product and deleting a product.

    @Autowired
    private ProductService productService;
    @Autowired
    BidService bidService;
    @Autowired
    private ImageHandlingService imageHandlingService;

    @GetMapping("/allProducts")
    public ResponseEntity<?> productDetails() {
        List<Product> allProducts = productService.getAllProducts();
        List<AllProductListDto> allProductListDto = allProducts.stream()
                .map(product -> new AllProductListDto(
                        product.getProductId(),
                        product.getProductName(),
                        product.getMinimumBid(),
                        product.getAuctionStartDate(),
                        product.getAuctionEndDate()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(allProductListDto, HttpStatus.OK);
    }

    @GetMapping("/getProductDetails/{productId}")
    public ResponseEntity<?> getProductDetailsById(@PathVariable Long productId) {
        Optional<Product> productDetailsOptional = productService.getProductDetailsById(productId);
        List<Bid> bidOnProduct = bidService.getBidsOnProduct(productId);
        if (productDetailsOptional.isEmpty()) {
            return new ResponseEntity<>("No product with given Id", HttpStatus.CONFLICT);
        }
        ProductWithBidDto productWithBidDto = new ProductWithBidDto(productDetailsOptional.get(), bidOnProduct);
        return new ResponseEntity<>(productWithBidDto, HttpStatus.OK);
    }

    @PostMapping("/createProduct")
    public ResponseEntity<?> createProduct(
            @RequestBody ProductWithCategoryListDto productWithCategoryListDto) {
        return new ResponseEntity<>(productService.createProduct(productWithCategoryListDto), HttpStatus.CREATED);

    }

    @DeleteMapping("/deleteProduct/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        return productService.deleteProduct(productId);
    }

    @PostMapping("/createProductsInBatch")
    public ResponseEntity<List<Product>> createProductsInBatch(@RequestBody List<Product> productList) {
        return productService.createProductsInBatch(productList);
    }
}