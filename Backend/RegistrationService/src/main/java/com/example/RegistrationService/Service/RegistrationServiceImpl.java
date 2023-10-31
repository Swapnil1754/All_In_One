package com.example.RegistrationService.Service;

import com.example.RegistrationService.Domain.User;
import com.example.RegistrationService.Encryption.UPISecurity;
import com.example.RegistrationService.Exceptions.UserAlreadyExistsException;
import com.example.RegistrationService.Exceptions.UserNotFoundException;
import com.example.RegistrationService.Producer.Producer;
import com.example.RegistrationService.Rabitmq.Domain.UserDTO;
import com.example.RegistrationService.Repository.RegistrationRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;
@Service
public class RegistrationServiceImpl implements RegistrationService {
    private RegistrationRepository repository;
    @Autowired
    private Producer producer;
    UPISecurity upiSecurity = new UPISecurity();
    final SecretKey key = upiSecurity.genrateKey();
@Autowired
    public RegistrationServiceImpl(RegistrationRepository repository) throws NoSuchAlgorithmException {
        this.repository = repository;
    }

    @Override
    public User registerUser(User user) throws Exception {
        String userId1 = uniqueAlphaNumeric(10);
        String pass = upiSecurity.encrypt(user.getPassword(), key);
        user.setUserId(userId1);
        user.setPassword(pass);
    if (repository.findById(user.getUserId()).isPresent()){
        throw new UserAlreadyExistsException();
    }
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setOwner(user.isOwner());
        userDTO.setActivated(user.isActivated());
        userDTO.setEmail(user.getEmail());
        userDTO.setName1(user.getName1());
        userDTO.setMobNo(user.getMobNo());
        userDTO.setPassword(user.getPassword());
        userDTO.setCity(user.getCity());
            repository.save(user);
            producer.sendMessageToRabbitMq(userDTO);
    return user;
    }
    @Override
    public User findUser(String userId,String password) throws Exception {
    if (repository.findById(userId).isEmpty()) {
        throw new UserNotFoundException();
    } else {
        User user = repository.findByUserId(userId);
        String password1 = user.getPassword();
        String pass = password.replaceAll("\"","");
        String password2 = upiSecurity.encrypt(pass,key);
        if (password1.equals(password2)) {
            return user;
        }else
        return null;
        }
    }

    @Override
    public User fetchUser(String userId) throws UserNotFoundException {
        if (repository.findById(userId).isEmpty()) {
            throw new UserNotFoundException();
        }
        return repository.findById(userId).get();
    }

    @Override
    public User getUserByEmail(String token) throws UserNotFoundException, JsonProcessingException {
        System.out.println("Token: "+token);
    String email = getEmail(token);
        System.out.println("here "+email);
        User user = repository.findByEmail(email);
        if (user!=null) {
            return user;
        }else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public User getUserByName(String name) throws UserNotFoundException {
        User user = repository.findByName1(name);
        if (user != null) {
            return user;
        }
        throw new UserNotFoundException();
    }

    private static String getEmail(String token) throws JsonProcessingException {
    String clientId = "578349732074-ddo6roou2d4o05trh2ajmevnngudc39n.apps.googleusercontent.com";
    String payLoad = token.split("\\.")[1];
        System.out.println("paylod: "+ payLoad);
    String emailId = new ObjectMapper().readTree(new String(Base64.getDecoder().decode(payLoad))).get("email").asText();
    return emailId;
//        try {
//            String[] tokenParts = token.split("\\.");
//            if (tokenParts.length < 2) {
//                System.out.println("Invalid token");
//                return "";
//            }
//
//            String payload = new String(Base64.getUrlDecoder().decode(tokenParts[1]), StandardCharsets.UTF_8);
//
//            Gson gson = new Gson();
//            Map<String, Object> payMap = gson.fromJson(payload, new TypeToken<Map<String, Object>>() {}.getType());
//            JSONObject payloadJson = new JSONObject(payMap);
//
//            String userId = (String) payloadJson.get("sub");
//            String email = (String) payloadJson.get("email");
//
//            System.out.println("User ID: " + userId);
//            System.out.println("Email: " + email);
//            return email;
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }

    private String alphaNumericRandom(int length) {
        final String s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder stringBuilder = new StringBuilder(length);
        SecureRandom random = new SecureRandom();
        for (int i=0;i<length;i++) {
            int x = random.nextInt(s.length());
            char c = s.charAt(x);
            stringBuilder.append(c);
        }
        return stringBuilder.toString();
    }
    private String uniqueAlphaNumeric(int length) {
        final String s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder stringBuilder = new StringBuilder(length);
        UUID uuid = UUID.randomUUID();
        stringBuilder.append(uuid.toString().replace("-",""));
        for (int i=0;i<=length;i++) {
            int x = (int) (Math.random()*s.length());
            char c = s.charAt(x);
            stringBuilder.append(c);
        }
        stringBuilder.setLength(length);
        return stringBuilder.toString().toUpperCase();
    }

}
