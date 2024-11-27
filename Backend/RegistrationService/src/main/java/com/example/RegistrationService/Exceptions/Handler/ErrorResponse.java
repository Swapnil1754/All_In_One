package com.example.RegistrationService.Exceptions.Handler;

import java.time.LocalDateTime;

public class ErrorResponse {
    private int errorCode;
    private String errorMessage;
    private LocalDateTime time;

    public ErrorResponse(int errorCode, String errorMessage, LocalDateTime time) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.time = time;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
