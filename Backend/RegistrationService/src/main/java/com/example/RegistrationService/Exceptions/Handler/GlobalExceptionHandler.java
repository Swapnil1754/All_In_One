package com.example.RegistrationService.Exceptions.Handler;

import com.example.RegistrationService.Exceptions.InvalidDataInputException;
import com.example.RegistrationService.Exceptions.UserAlreadyExistsException;
import com.example.RegistrationService.Exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserAlreadyExistsException.class)
    ResponseEntity<ErrorResponse> userAlreadyExistsHandler(UserAlreadyExistsException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.ALREADY_REPORTED.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.ALREADY_REPORTED);
    }
    @ExceptionHandler(UserNotFoundException.class)
    ResponseEntity<ErrorResponse> userNotFoundHandler(UserNotFoundException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(InvalidDataInputException.class)
    ResponseEntity<ErrorResponse> invalidDataInputHandler(InvalidDataInputException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.BAD_REQUEST);
    }
}
