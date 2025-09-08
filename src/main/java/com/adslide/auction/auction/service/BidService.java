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

    public ResponseEntity<String> createBid(Bid bidDetails) {
        // checking if time is valid
        Long bidProductId = bidDetails.getProduct().getProductId();
        Optional<Product> bidProductOptional = productRepository.findById(bidProductId);

        if (bidProductOptional.isEmpty()) { // checking if product exists
            return new ResponseEntity<>("No such product found", HttpStatus.CONFLICT);
        }

        Product bidProduct = bidProductOptional.get();
        LocalDateTime auctionEndDate = bidProduct.getAuctionEndDate();
        LocalDateTime currentTime = LocalDateTime.now();
        boolean isBidTimeValid = currentTime.isBefore(auctionEndDate);

        if (!isBidTimeValid) {
            return new ResponseEntity<>("Auction time has ended", HttpStatus.CONFLICT);
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
            return new ResponseEntity<>("bid is lower than the current highest bid or the minimum price",
                    HttpStatus.CONFLICT);
        }

        bidRepository.saveAndFlush(bidDetails);
        return new ResponseEntity<>("bid created", HttpStatus.CREATED);

    }
}
