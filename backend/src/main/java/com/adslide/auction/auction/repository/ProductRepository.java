package com.adslide.auction.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adslide.auction.auction.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    //connects with mysql table with jpa


}
