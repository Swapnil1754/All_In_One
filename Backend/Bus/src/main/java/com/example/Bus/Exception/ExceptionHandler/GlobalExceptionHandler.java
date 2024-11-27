package com.example.Bus.Exception.ExceptionHandler;

import com.example.Bus.Exception.BusAlreadyExistsException;
import com.example.Bus.Exception.BusNotFoundException;
import com.example.Bus.Exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusAlreadyExistsException.class)
    ResponseEntity<ErrorResponse> busAlreadyExists(BusAlreadyExistsException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.ALREADY_REPORTED.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.ALREADY_REPORTED);
    }
    @ExceptionHandler(BusNotFoundException.class)
    ResponseEntity<ErrorResponse> busNotFoundException(BusNotFoundException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(UserNotFoundException.class)
    ResponseEntity<ErrorResponse> userNotFoundException(UserNotFoundException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.NOT_FOUND);
    }
}
