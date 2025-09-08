package com.adslide.auction.auction.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adslide.auction.auction.model.User;
import com.adslide.auction.auction.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(Long userId){
        return userRepository.findById(userId);
    }

    public String createUser(User newUser) {
        userRepository.saveAndFlush(newUser);
        return "User Created";
    }
}
