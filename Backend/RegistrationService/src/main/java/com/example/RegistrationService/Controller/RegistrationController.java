package com.example.RegistrationService.Controller;

import com.example.RegistrationService.Domain.User;
import com.example.RegistrationService.Service.JwtSecurityTokenGenerator;
import com.example.RegistrationService.Service.MaskData;
import com.example.RegistrationService.Service.MaskService;
import com.example.RegistrationService.Service.RegistrationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
public class RegistrationController {
    private RegistrationService registrationService;
    private ResponseEntity responseEntity;
    private JwtSecurityTokenGenerator tokenGenerator;
@Autowired
    public RegistrationController(RegistrationService registrationService, JwtSecurityTokenGenerator tokenGenerator, MaskService maskService) {
        this.registrationService = registrationService;
        this.tokenGenerator = tokenGenerator;
    }
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) throws IOException {
//    User user1 = MaskService.dataMaskFun(user);
        String srtData = MaskData.maskFun(user);
        ObjectMapper objectMapper = new ObjectMapper();
        User user1 = objectMapper.readValue(srtData,User.class);
//        Gson gson = new Gson();
//        User user1 = null;
//        user1 = gson.fromJson(srtData, User.class);
        System.out.println(user1);
    try {
        responseEntity=new ResponseEntity<>(registrationService.registerUser(user1), HttpStatus.OK);
    }catch (Exception e){
        throw new RuntimeException();
    }
    return responseEntity;
    }
    @PostMapping("/login/{userId}")
    public ResponseEntity<User> login(@PathVariable String userId, @RequestParam(name = "password") String password){
    try {
        responseEntity = new ResponseEntity<>(tokenGenerator.generateToken(registrationService.findUser(userId,password)), HttpStatus.ACCEPTED);
    }catch (Exception e){
        throw new RuntimeException();
    }
    return responseEntity;
    }
}
