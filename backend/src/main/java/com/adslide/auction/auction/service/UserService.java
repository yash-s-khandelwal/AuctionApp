package com.adslide.auction.auction.service;

import java.util.List;
import java.util.Optional;

import com.adslide.auction.auction.exception.DuplicateUserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.adslide.auction.auction.model.User;
import com.adslide.auction.auction.repository.UserRepository;

import org.mindrot.jbcrypt.BCrypt;

@Service
public class UserService {
    // all methods do what is stated in their name

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public User createUser(User newUser) {
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            throw new DuplicateUserException("Username already exists, please choose another username.");
        }

        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            throw new DuplicateUserException("Email already in use, please use it to login");
        }

        if (userRepository.findByPhoneNumber(newUser.getPhoneNumber()).isPresent()) {
            throw new DuplicateUserException("Phone Number already in use, please use the account associated with it.");
        }
        return userRepository.saveAndFlush(newUser);

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
