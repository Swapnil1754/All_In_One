package com.example.RegistrationService.Service;

import com.example.RegistrationService.Domain.User;

import java.security.NoSuchAlgorithmException;

public interface RegistrationService {
    public User registerUser(User user) throws Exception;
    public User findUser(String userId,String password) throws Exception;
}
