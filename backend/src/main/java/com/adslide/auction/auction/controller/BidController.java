package com.adslide.auction.auction.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.adslide.auction.auction.dto.BidDto;
import com.adslide.auction.auction.dto.ProductListDto;
import com.adslide.auction.auction.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adslide.auction.auction.model.Bid;
import com.adslide.auction.auction.service.BidService;
import com.adslide.auction.auction.service.PaymentGatewayService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api/v0/bid")

// this class will be the controller for all the bids
// it allows users to create a bid, and get bids for a product, and get bids
// created by user
public class BidController {
    @Autowired
    public BidService bidService;
    @Autowired
    public PaymentGatewayService paymentGatewayService;

    @GetMapping("/getBidsOnProduct/{productId}")
    public ResponseEntity<?> getBidsOnProduct(@PathVariable Long productId) {
        List<Bid> productBids = bidService.getBidsOnProduct(productId);
        return new ResponseEntity<>(productBids, HttpStatus.OK);
    }

    @GetMapping("/getBidsOfUser/{userId}")
    public ResponseEntity<?> getBidsOfUser(@PathVariable Long userId) {
        List<Bid> userBidsList = bidService.getBidsOfUser(userId);
        ArrayList<BidDto> bidDtoList = new ArrayList<>();
        if(userBidsList ==null) {
            return new ResponseEntity<>("No bids placed yet", HttpStatus.OK);
        }
            for(Bid bid : userBidsList){
                BidDto userBid = new BidDto();
                if (bid != null && Objects.equals(bid.getBidStatus(), "paid")) {
                    Product bidProduct = bid.getProduct();
                    ProductListDto bidProductDto= new ProductListDto(bidProduct.getProductId(), bidProduct.getProductName());
                    userBid.setBidId(bid.getBidId());
                    userBid.setPrice(bid.getPrice());
                    userBid.setBidStatus(bid.getBidStatus());
                    userBid.setProduct(bidProductDto);
                bidDtoList.add(userBid);
                }
            }

            return new ResponseEntity<>(bidDtoList, HttpStatus.OK);
    }

    @PostMapping("/createBid")
    public ResponseEntity<String> createBid(@RequestBody Bid bidDetails) {
        Bid createdBid = bidService.createBid(bidDetails);
        try {
            String orderId = paymentGatewayService.createOrder(
                (int) createdBid.getPrice(),
                "INR",
                createdBid.getBidId(),
                createdBid.getProduct().getProductId(),
                createdBid.getUser().getUserId());
            return new ResponseEntity<>(orderId, HttpStatus.CREATED);
        } catch (RazorpayException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/updateBid")
    public ResponseEntity<?> updateBid(@RequestBody Bid updatedStatus) {
        return new ResponseEntity<>(bidService.updateStatusBid(updatedStatus), HttpStatus.OK);
    }

    @PutMapping("/deleteBid/{bidId}")
    public ResponseEntity<?> deleteBid(@PathVariable Long bidId){
        Bid completeBid = bidService.getBidDetails(bidId);
        String refundStatus;
        try {
            bidService.deleteBid(completeBid.getBidId());
            refundStatus = paymentGatewayService.createRefund(completeBid);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return new ResponseEntity<>("Refund not processed, contact customer care",HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("Bid cancelled and refund processed successfully", HttpStatus.ACCEPTED);
    }

    @PostMapping("/createBidsInBatch")
    public ResponseEntity<List<Bid>> createBidsInBatch(@RequestBody List<Bid> bidList) {
        return new ResponseEntity<>(bidService.createBidsInBatch(bidList), HttpStatus.CREATED);
    }
}
