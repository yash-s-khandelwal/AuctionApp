package com.adslide.auction.auction.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.adslide.auction.auction.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Find products where auctionEndDate is before now
    List<Product> findByAuctionEndDateBefore(java.time.LocalDateTime now);
}
