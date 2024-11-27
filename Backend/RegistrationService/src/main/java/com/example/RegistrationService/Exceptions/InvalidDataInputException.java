package com.example.RegistrationService.Exceptions;

public class InvalidDataInputException extends RuntimeException {
    public InvalidDataInputException(String errorMessage) {
        super(errorMessage);
    }
}
