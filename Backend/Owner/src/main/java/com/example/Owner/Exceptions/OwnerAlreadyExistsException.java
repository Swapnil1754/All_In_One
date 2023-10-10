package com.example.Owner.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "This Owner is Already Exists in System...!!!")
public class OwnerAlreadyExistsException extends Exception{
}
