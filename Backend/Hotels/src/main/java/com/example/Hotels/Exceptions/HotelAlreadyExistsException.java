package com.example.Hotels.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
public class HotelAlreadyExistsException extends RuntimeException {
    public HotelAlreadyExistsException(String message) {
        super(message);
    }
}
