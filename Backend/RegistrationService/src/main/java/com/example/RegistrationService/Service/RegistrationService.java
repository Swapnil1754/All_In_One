package com.example.RegistrationService.Service;

import com.example.RegistrationService.Domain.User;
import com.example.RegistrationService.Exceptions.UserNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import reactor.core.publisher.Mono;

import java.security.NoSuchAlgorithmException;

public interface RegistrationService {
    public User registerUser(User user) throws Exception;
    public User findUser(String userId,String password) throws Exception;
    public User fetchUser(String userId) throws UserNotFoundException;
    public User getUserByEmail(String email) throws UserNotFoundException, JsonProcessingException;
    public User getUserByName(String name) throws UserNotFoundException;

}
