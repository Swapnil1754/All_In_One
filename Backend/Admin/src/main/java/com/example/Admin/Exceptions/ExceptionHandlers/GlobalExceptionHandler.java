package com.example.Admin.Exceptions.ExceptionHandlers;

import com.example.Admin.Exceptions.CityAlreadyExistsException;
import com.example.Admin.Exceptions.CityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CityAlreadyExistsException.class)
    ResponseEntity<ErrorResponse> cityAlreadyExistsHandler(CityAlreadyExistsException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.ALREADY_REPORTED.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.ALREADY_REPORTED);
    }
    @ExceptionHandler(CityNotFoundException.class)
    ResponseEntity<ErrorResponse> cityNotFoundHandler(CityNotFoundException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.NOT_FOUND);
    }
}
