package com.example.Bus.Exception;

public class BusAlreadyExistsException extends RuntimeException {
    public BusAlreadyExistsException(String errorMessage) {
        super(errorMessage);
    }
}
