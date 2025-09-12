package com.adslide.auction.auction.controller;

import java.util.List;

import com.adslide.auction.auction.service.PaymentGatewayService;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.adslide.auction.auction.model.Bid;
import com.adslide.auction.auction.service.BidService;

@RestController
@RequestMapping("/api/v0/bid")
public class BidController {
    @Autowired
    public BidService bidService;
    @Autowired
    public PaymentGatewayService paymentGatewayService;

    @GetMapping("/getBidsOnProduct/{productId}")
    public List<Bid> getBidsOnProduct(@PathVariable Long productId) {
        return bidService.getBidsOnProduct(productId);
    }

    @GetMapping("/getBidsOfUser/{userId}")
    public ResponseEntity<?> getBidsOfUser(@PathVariable Long userId) {
        return new ResponseEntity<>( bidService.getBidsOfUser(userId), HttpStatus.OK);
    }

    @PostMapping("/createBid")
    public ResponseEntity<String> createBid(@RequestBody Bid bidDetails) {
        Bid createdBid = bidService.createBid(bidDetails);
        try {
            String orderId = paymentGatewayService.createOrder((int) bidDetails.getPrice(), "INR", createdBid.getBidId(), bidDetails.getProduct().getProductId(), bidDetails.getUser().getUserId());

            return new ResponseEntity<>(orderId, HttpStatus.CREATED);
        } catch (RazorpayException e){
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/createBidsInBatch")
    public ResponseEntity<List<Bid>> createBidsInBatch(@RequestBody List<Bid> bidList) {
        return new ResponseEntity<>(bidService.createBidsInBatch(bidList), HttpStatus.CREATED);
    }
}
