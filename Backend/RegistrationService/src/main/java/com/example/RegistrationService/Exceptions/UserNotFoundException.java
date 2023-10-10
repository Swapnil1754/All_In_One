package com.example.RegistrationService.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "User Does Not Exists in System...!!!")
public class UserNotFoundException extends Exception{
}
