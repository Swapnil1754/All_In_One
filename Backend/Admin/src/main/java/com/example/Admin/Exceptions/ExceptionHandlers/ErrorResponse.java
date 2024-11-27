package com.example.Admin.Exceptions.ExceptionHandlers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ErrorResponse {
    private int errorCode;
    private String errorMessage;
    private LocalDateTime time;
}
