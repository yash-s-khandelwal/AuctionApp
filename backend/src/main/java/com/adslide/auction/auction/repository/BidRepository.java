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
    // connects with mysql table with jpa

    // follows jpa syntax, used for finding bids on a product
    public List<Bid> findByProductProductId(Long productId);

    // follows jpa syntax, used for finding bids from a user
    public List<Bid> findByUserUserId(Long userId);

    // used for backend validation of the bidding amount runs this query and return
    // the highest bid on a product
    @Query("select max(b.price) from Bid b where b.product.productId = :productId and b.bidStatus = :bidStatus")
    public Optional<Float> getHighestBid(@Param("productId") Long productId, @Param("bidStatus") String bidStatus);

    // follows jpa syntax, used for finding bids on a product which are paid
    public List<Bid> findByProductProductIdAndBidStatus(Long productId, String bidStatus);

}
