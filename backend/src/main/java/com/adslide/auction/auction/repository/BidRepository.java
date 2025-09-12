package com.adslide.auction.auction.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.adslide.auction.auction.model.Bid;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    public List<Bid> findByProductProductId(Long productId);

    public List<Bid> findByUserUserId(Long userId);

    @Query("select max(b.price) from Bid b where b.product.productId = :productId")
    public Optional<Float> getHighestBid(@Param("productId") Long productId);

}
