package com.example.Owner.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


public class OwnerAlreadyExistsException extends RuntimeException {
    public OwnerAlreadyExistsException(String message) {
        super(message);
    }
}
