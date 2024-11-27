package com.example.BookingService.Exceptions;

public class SendSMSException extends RuntimeException {
    public SendSMSException(String errorMessage) {
        super(errorMessage);
    }
}
