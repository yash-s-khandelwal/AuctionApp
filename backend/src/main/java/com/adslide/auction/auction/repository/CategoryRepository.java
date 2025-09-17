package com.adslide.auction.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adslide.auction.auction.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    //connects with mysql table with jpa
    Category findByCategoryName(String categoryName);
}
