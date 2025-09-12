package com.adslide.auction.auction.controller;

import com.adslide.auction.auction.model.Bid;
import com.adslide.auction.auction.model.Product;
import com.adslide.auction.auction.model.User;
import com.adslide.auction.auction.service.PaymentGatewayService;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v0/payment")
public class PaymentController {

    @Autowired
    public PaymentGatewayService paymentGatewayService;

    @PostMapping("/createOrder")
    public String createOrderIdString(@RequestParam int amount, @RequestParam Product productDetails, @RequestParam User userDetails, @RequestParam Bid bidDetail){
        try {
            return paymentGatewayService.createOrder(amount, "INR", bidDetail.getBidId(),productDetails.getProductId(), userDetails.getUserId());
        } catch (RazorpayException e) {
            throw new RuntimeException(e);
        }
    }
}
