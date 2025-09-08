package com.adslide.auction.auction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adslide.auction.auction.model.Bid;
import com.adslide.auction.auction.service.BidService;

@RestController
@RequestMapping("/api/v0/bid")
public class BidController {
    @Autowired
    public BidService bidService;

    @GetMapping("/getBidsOnProduct/{productId}")
    public List<Bid> getBidsOnProduct(@PathVariable Long productId){
        return bidService.getBidsOnProduct(productId);
    }
}
