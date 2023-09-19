package com.example.RegistrationService.Service;

import com.example.RegistrationService.Domain.User;

import java.util.Map;

public interface JwtSecurityTokenGenerator {
    Map<String,String> generateToken(User user);
}
