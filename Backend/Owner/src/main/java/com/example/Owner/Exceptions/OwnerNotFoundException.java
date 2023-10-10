package com.example.Owner.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Owner Not Available in System...!!!")
public class OwnerNotFoundException extends Exception{
}
