package com.example.BookingService.Exceptions.ExceptionHandler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class ErrorResponse {
    private int errorCode;
    private String errorMessage;
    private LocalDateTime time;
}
