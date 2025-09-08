package com.adslide.auction.auction.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adslide.auction.auction.model.Bid;

@Repository
public interface BidRepository extends JpaRepository<Bid, UUID> {

}
