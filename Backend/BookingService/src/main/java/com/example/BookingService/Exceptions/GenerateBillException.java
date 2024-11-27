package com.example.BookingService.Exceptions;

public class GenerateBillException extends RuntimeException {
    public GenerateBillException(String errorMessage) {
        super(errorMessage);
    }
}
