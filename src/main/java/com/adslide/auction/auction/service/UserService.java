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
    private Optional<User> byId;

    public Optional<User> getUserById(Long userId){
        return userRepository.findById(userId);
    }

    public String createUser(User newUser) {
        userRepository.saveAndFlush(newUser);
        return "User Created";
    }

    public String updateUser(User updatedUser) {
        Optional<User> userOriginal = userRepository.findById(updatedUser.getUserId());
        if(userOriginal.isPresent()){
            userRepository.saveAndFlush(updatedUser);
            return "updated user details";

        } else {
            return "could not find user";
        }
    }
}
