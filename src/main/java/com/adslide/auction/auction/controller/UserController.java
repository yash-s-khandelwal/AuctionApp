package com.adslide.auction.auction.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private UserService userService;

    @GetMapping("/test")
    public String testcheck(){
        return "working";
    }

    @PostMapping("/test1")
    public String postTest(){
        return "post method working";
    }

    @GetMapping("/getUserDetailsById/{userId}")
    public Optional<User> getUserDetailsById(@PathVariable Long userId){
        return userService.getUserById(userId);

    }

    @PostMapping("/createUser")
    public String createUser(@RequestBody User newUser){
        return userService.createUser(newUser);
    }


}
