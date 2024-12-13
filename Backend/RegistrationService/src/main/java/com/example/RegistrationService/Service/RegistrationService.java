package com.example.RegistrationService.Service;

import com.example.RegistrationService.Domain.User;
import com.example.RegistrationService.Exceptions.UserNotFoundException;
import com.example.RegistrationService.Rabitmq.Domain.UserDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import reactor.core.publisher.Mono;

import javax.swing.text.html.Option;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

public interface RegistrationService {
    UserDTO registerUser(UserDTO userDTO) throws Exception;
    User findUser(String userId,String password) throws Exception;
    User fetchUser(String userId) throws UserNotFoundException;
    User getUserByToken(String token) throws UserNotFoundException, JsonProcessingException;
    User getUserByName(String name) throws UserNotFoundException;
    User getUserByEmail(String email) throws UserNotFoundException;
    User updatePassword(String email, String mobNo, String password);
    Optional<User> updateUserProfile(User user);

}
