package com.example.Hotels.Exceptions.ExceptionHandler;

import co.elastic.clients.elasticsearch.nodes.Http;
import com.example.Hotels.Exceptions.HotelAlreadyExistsException;
import com.example.Hotels.Exceptions.HotelNotFoundException;
import com.example.Hotels.Exceptions.InvalidCityException;
import com.example.Hotels.Exceptions.InvalidDataException;
import com.example.Hotels.Exceptions.OwnerNotExistsException;
import com.example.Hotels.Exceptions.RoomNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(HotelAlreadyExistsException.class)
    ResponseEntity<ErrorResponse> hotelAlreadyExistHandler(HotelAlreadyExistsException exception) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.ALREADY_REPORTED.value(), exception.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.ALREADY_REPORTED);
    }
    @ExceptionHandler(HotelNotFoundException.class)
    ResponseEntity<ErrorResponse> hotelNotFoundHandler(HotelNotFoundException exception) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), exception.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(OwnerNotExistsException.class)
    ResponseEntity<ErrorResponse> ownerNotExistsHandler(OwnerNotExistsException exception) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), exception.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(RoomNotFoundException.class)
    ResponseEntity<ErrorResponse> roomNotFoundHandler (RoomNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(InvalidDataException.class)
    ResponseEntity<ErrorResponse> invalidDataHandler(InvalidDataException e) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(InvalidCityException.class)
    ResponseEntity<ErrorResponse> invalidCityHandler(InvalidCityException e) {
        return new ResponseEntity<>(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage(), LocalDateTime.now()), HttpStatus.BAD_REQUEST);
    }
}
