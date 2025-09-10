package com.adslide.auction.auction.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.adslide.auction.auction.model.User;
import com.adslide.auction.auction.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public String createUser(User newUser) {
        userRepository.saveAndFlush(newUser);
        return "User Created";
    }

    public String updateUser(User updatedUser) {
        Optional<User> userOriginal = userRepository.findById(updatedUser.getUserId());
        if (userOriginal.isPresent()) {
            userRepository.saveAndFlush(updatedUser);
            return "updated user details";

        } else {
            return "could not find user";
        }
    }

    public ResponseEntity<List<User>> createUsersInBatch(List<User> userList) {
        return new ResponseEntity<>(userRepository.saveAllAndFlush(userList), HttpStatus.CREATED);
    }
}
