package com.adslide.auction.auction.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adslide.auction.auction.model.CategoryLink;

@Repository
public interface CategoryLinkRepository extends JpaRepository<CategoryLink, Long> {

    List<CategoryLink> findByCategoryCategoryId(Long categoryId);

}
