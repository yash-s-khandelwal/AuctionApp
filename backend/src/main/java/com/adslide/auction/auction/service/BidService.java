package com.adslide.auction.auction.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.adslide.auction.auction.model.Bid;
import com.adslide.auction.auction.model.Product;
import com.adslide.auction.auction.repository.BidRepository;
import com.adslide.auction.auction.repository.ProductRepository;

@Service
public class BidService {
    // all methods do what is stated in their name
    @Autowired
    public BidRepository bidRepository;
    @Autowired
    public ProductRepository productRepository;

    public List<Bid> getBidsOnProduct(Long productId) {
        return bidRepository.findByProductProductId(productId);
    }

    public List<Bid> getBidsOfUser(Long userId) {
        return bidRepository.findByUserUserId(userId);
    }

    public Bid createBid(Bid bidDetails) {
        // checking if time is valid
        Long bidProductId = bidDetails.getProduct().getProductId();
        Optional<Product> bidProductOptional = productRepository.findById(bidProductId);

        if (bidProductOptional.isEmpty()) { // checking if product exists
            throw new IllegalStateException("No such product found");
        }

        Product bidProduct = bidProductOptional.get();
        LocalDateTime auctionEndDate = bidProduct.getAuctionEndDate();
        LocalDateTime auctionStartDate = bidProduct.getAuctionStartDate();
        LocalDateTime currentTime = LocalDateTime.now();
        boolean isBidTimeAfterStart = currentTime.isAfter(auctionStartDate);
        boolean isBidTimeBeforeEnd = currentTime.isBefore(auctionEndDate);

        // checking if time for bid is valid
        if (!isBidTimeAfterStart) {
            throw new IllegalStateException("Auction is yet to start");
        }
        if (!isBidTimeBeforeEnd) {
            throw new IllegalStateException("Auction time has ended");
        }

        // getting required details from the object
        Float productMinimumPrice = bidProduct.getMinimumBid();
        Long productId = bidProduct.getProductId();
        Optional<Float> highestCurrentBid = bidRepository.getHighestBid(productId);

        // checking current bids
        boolean hasAnyBid = highestCurrentBid.isPresent();
        boolean isBidValidPrice;

        // checking if higher price than current highest
        if (hasAnyBid) {
            isBidValidPrice = bidDetails.getPrice() > highestCurrentBid.get();
        } else { // checking for mimimum price instead
            isBidValidPrice = bidDetails.getPrice() > productMinimumPrice;
        }

        if (!isBidValidPrice) {
            // if the bid is being placed for a lower price than the current highest bid
            throw new IllegalStateException("bid is lower than the current highest bid or the minimum price");
        }
        bidDetails.setProduct(bidProduct);
        return bidRepository.saveAndFlush(bidDetails);

    }

    public List<Bid> createBidsInBatch(List<Bid> bidList) {
        return bidRepository.saveAllAndFlush(bidList);

    }
}
