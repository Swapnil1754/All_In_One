package com.example.Bus.Exception;

public class BusNotFoundException extends RuntimeException {
    public BusNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
