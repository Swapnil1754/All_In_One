package com.example.BookingService.Exceptions.ExceptionHandler;

import com.example.BookingService.Exceptions.GenerateBillException;
import com.example.BookingService.Exceptions.SendSMSException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(GenerateBillException.class)
    ResponseEntity<ErrorResponse> generateBillHandler(GenerateBillException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(SendSMSException.class)
    ResponseEntity<ErrorResponse> sendSMSHandler(SendSMSException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.BAD_REQUEST);
    }
}
