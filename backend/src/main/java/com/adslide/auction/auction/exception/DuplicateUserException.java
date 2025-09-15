package com.adslide.auction.auction.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//this file defines an exception for when we have an existing user with those details in our db.
@ResponseStatus(HttpStatus.CONFLICT) // This is for convenience with @ExceptionHandler
public class DuplicateUserException extends RuntimeException {
    public DuplicateUserException(String message) {
        super(message);
    }
}