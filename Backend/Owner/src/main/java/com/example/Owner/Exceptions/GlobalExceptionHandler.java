package com.example.Owner.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(OwnerAlreadyExistsException.class)
    ResponseEntity<ErrorResponse> ownerAlreadyExistsHandler(OwnerAlreadyExistsException exception) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.ALREADY_REPORTED.value(), exception.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.ALREADY_REPORTED);
    }
    @ExceptionHandler(OwnerNotFoundException.class)
    ResponseEntity<ErrorResponse> ownerNotFoundHandler(OwnerNotFoundException exception) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), exception.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
}
