package com.example.Hotels.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
public class OwnerNotExistsException extends RuntimeException {
    public OwnerNotExistsException(String message) {
        super(message);
    }
}
