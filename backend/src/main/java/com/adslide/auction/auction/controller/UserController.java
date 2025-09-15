package com.adslide.auction.auction.controller;

import java.util.List;
import java.util.Optional;

import com.adslide.auction.auction.exception.DuplicateUserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adslide.auction.auction.model.User;
import com.adslide.auction.auction.service.UserService;

@RestController
@RequestMapping("/api/v0/user")
public class UserController {
    //this class has apis for creating a user, getting a user's details and updating a user details
    @Autowired
    private UserService userService;

    @GetMapping("/getUserDetailsById/{userId}")
    public Optional<User> getUserDetailsById(@PathVariable Long userId) {
        return userService.getUserById(userId);

    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        try{
            userService.createUser(newUser);
            return new ResponseEntity<>("User Created", HttpStatus.CREATED);
        } catch (DuplicateUserException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);

        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error has occurred"+ e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/updateUser")
    public String updateUser(@RequestBody User updatedUser) {
        return userService.updateUser(updatedUser);
    }

    @PostMapping("/createUsersInBatch")
    public ResponseEntity<List<User>> createUsersinBatch(@RequestBody List<User> userList) {
        return userService.createUsersInBatch(userList);
    }

}
