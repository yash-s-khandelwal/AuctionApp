package com.adslide.auction.auction.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adslide.auction.auction.model.Bid;
import com.adslide.auction.auction.repository.BidRepository;

@Service
public class BidService {
    @Autowired
    public BidRepository bidRepository;
    public List<Bid> findByProductId(Long productId){
            return bidRepository.findByProductProductId(productId);
        }

    public List<Bid> getBidsOnProduct(Long productId){
        return bidRepository.findByProductProductId(productId);
        }
    }
    
