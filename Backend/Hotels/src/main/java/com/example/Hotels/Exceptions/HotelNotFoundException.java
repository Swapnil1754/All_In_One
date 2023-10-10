package com.example.Hotels.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Hotel is Not Available in System...!!!")
public class HotelNotFoundException extends Exception {
}
