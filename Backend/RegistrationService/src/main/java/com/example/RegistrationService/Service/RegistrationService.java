package com.example.RegistrationService.Service;

import com.example.RegistrationService.Domain.User;
import com.example.RegistrationService.Exceptions.UserNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import reactor.core.publisher.Mono;

import java.security.NoSuchAlgorithmException;

public interface RegistrationService {
    User registerUser(User user) throws Exception;
    User findUser(String userId,String password) throws Exception;
    User fetchUser(String userId) throws UserNotFoundException;
    User getUserByToken(String token) throws UserNotFoundException, JsonProcessingException;
    User getUserByName(String name) throws UserNotFoundException;
    User getUserByEmail(String email) throws UserNotFoundException;

}
