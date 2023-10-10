package com.example.Hotels.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "This Hotel Already Exists in System...!!!")
public class HotelAlreadyExistsException extends Exception {
}
