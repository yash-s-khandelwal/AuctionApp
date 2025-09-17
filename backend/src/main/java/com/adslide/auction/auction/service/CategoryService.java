package com.adslide.auction.auction.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adslide.auction.auction.model.Category;
import com.adslide.auction.auction.model.CategoryLink;
import com.adslide.auction.auction.model.Product;
import com.adslide.auction.auction.repository.CategoryLinkRepository;
import com.adslide.auction.auction.repository.CategoryRepository;

@Service
public class CategoryService {
    @Autowired
    public CategoryRepository categoryRepository;
    @Autowired
    public CategoryLinkRepository categoryLinkRepository;

    public Category createCategory(Category categroryDetails) {
        return categoryRepository.saveAndFlush(categroryDetails);
    }

    public List<Category> createCategoryInBatch(List<Category> categoryList) {
        return categoryRepository.saveAllAndFlush(categoryList);
    }

    public CategoryLink createCategoryLink(CategoryLink categoryLink) {
        return categoryLinkRepository.saveAndFlush(categoryLink);
    }

    public List<CategoryLink> createCategoryLinkInBatch(List<CategoryLink> categoryLinkList) {
        return categoryLinkRepository.saveAllAndFlush(categoryLinkList);
    }

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public List<Product> getProductsInCategory(Long categoryId) {
        List<CategoryLink> links = categoryLinkRepository.findByCategoryCategoryId(categoryId);
        List<Product> products = new java.util.ArrayList<>();
        if (links != null) {
            for (CategoryLink link : links) {
                if (link != null && link.getProduct() != null) {
                    products.add(link.getProduct());
                }
            }
        }
        return products;
    }

}
