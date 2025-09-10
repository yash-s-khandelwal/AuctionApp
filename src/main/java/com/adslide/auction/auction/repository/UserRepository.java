package com.adslide.auction.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adslide.auction.auction.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
