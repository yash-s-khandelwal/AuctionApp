package com.adslide.auction.auction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adslide.auction.auction.model.Category;
import com.adslide.auction.auction.model.CategoryLink;
import com.adslide.auction.auction.service.CategoryService;

//this class will be the controller that returns categories
//it has the apis for creating a new category(only for an admin user) and a categoryLink for when a new product is created.
@RestController
@RequestMapping("/api/v0/category")
public class CategoryController {
    @Autowired
    public CategoryService categoryService;

    @GetMapping("/getAllCategory")
    public ResponseEntity<?> getAllCategory() {
        return new ResponseEntity<>(categoryService.getCategories(), HttpStatus.OK);
    }

    @PostMapping("/createCategoryInBatch")
    public ResponseEntity<?> createCategoryInBatch(@RequestBody List<Category> categoryList) {
        return new ResponseEntity<>(categoryService.createCategoryInBatch(categoryList), HttpStatus.CREATED);
    }

    @PostMapping("/createCategory")
    public ResponseEntity<?> createCategory(@RequestBody Category categoryDetails) {
        return new ResponseEntity<>(categoryService.createCategory(categoryDetails), HttpStatus.CREATED);
    }

    @PostMapping("/createCategoryLinkInBatch")
    public ResponseEntity<?> createCategoryLinkInBatch(@RequestBody List<CategoryLink> categoryLinkList) {
        return new ResponseEntity<>(categoryService.createCategoryLinkInBatch(categoryLinkList), HttpStatus.CREATED);
    }

    @GetMapping("/getProductInCategory/{categoryId}")
    public ResponseEntity<?> getProductInCategory(@PathVariable Long categoryId) {
        return new ResponseEntity<>(categoryService.getProductsInCategory(categoryId), HttpStatus.OK);
    }
}
