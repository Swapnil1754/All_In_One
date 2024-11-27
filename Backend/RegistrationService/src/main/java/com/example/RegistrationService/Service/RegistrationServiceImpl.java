package com.example.RegistrationService.Service;

import com.example.RegistrationService.Domain.User;
import com.example.RegistrationService.Encryption.UPISecurity;
import com.example.RegistrationService.Exceptions.InvalidDataInputException;
import com.example.RegistrationService.Exceptions.UserAlreadyExistsException;
import com.example.RegistrationService.Exceptions.UserNotFoundException;
import com.example.RegistrationService.Producer.Producer;
import com.example.RegistrationService.Rabitmq.Domain.UserDTO;
import com.example.RegistrationService.Repository.RegistrationRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;
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
        throw new UserAlreadyExistsException("User Already Exists...");
    }
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setOwner(user.isOwner());
        userDTO.setActivated(user.isActivated());
        userDTO.setEmail(user.getEmail());
        userDTO.setName1(user.getName1());
        userDTO.setMobNo(String.valueOf(user.getMobNo()));
        userDTO.setPassword(user.getPassword());
        userDTO.setCity(user.getCity());
            repository.save(user);
            producer.sendMessageToRabbitMq(userDTO);
        System.out.println("Mob No: " + userDTO.getMobNo());
    return user;
    }
    @Override
    public User findUser(String userId,String password) throws Exception {
        try {
            User user = repository.findByUserId(userId);
            String password1 = user.getPassword();
            String pass = password.replaceAll("\"", "");
            String password2 = upiSecurity.encrypt(pass, key);
            if (password1.equals(password2)) {
                return user;
            } else
                return null;
        } catch (Exception e) {
            throw new UserNotFoundException("User Does Not Exists in System...!!!");
        }
    }

    @Override
    public User fetchUser(String userId) {
    try {
        repository.findById(userId);
        return repository.findById(userId).get();
    } catch (Exception e) {
        throw new UserNotFoundException("User Does Not Exists in System...!!!");
    }
    }

    @Override
    public User getUserByToken(String token) throws JsonProcessingException {
    String email = getEmail(token);
        System.out.println("here "+email);
        User user = repository.findByEmail(email);
        if (user!=null) {
            return user;
        } else {
            throw new UserNotFoundException("User Does Not Exists in System...!!!");
        }
    }

    @Override
    public User getUserByName(String name) throws UserNotFoundException {
        User user = repository.findByName1(name);
        if (user != null) {
            return user;
        }
        throw new UserNotFoundException("User Does Not Exists in System...!!!");
    }
    @Override
    public User getUserByEmail(String email) {
    try {
        User user = repository.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("User Does Not Exists in System...!!!");
        } else {
            return user;
        }
    } catch (Exception e) {
        throw new InvalidDataInputException("Invalid Data Entered...");
    }
    }

    @Override
    public User updatePassword(String email, String mobNo, String password) {
        try {
            User user = repository.findByEmailOrMobNo(email, mobNo);
            User user1 = new User();
            UserDTO userDTO = new UserDTO();
            BeanUtils.copyProperties(user, user1);
            user1.setPassword(password);
            BeanUtils.copyProperties(user1, userDTO);
            producer.sendMessageToRabbitMq(userDTO);
            return repository.save(user1);
        } catch (Exception e) {
            throw new UserNotFoundException("User Not Found...");
        }
    }

    @Override
    public Optional<User> updateUserProfile(User user) {
    User user1 = repository.findByEmailOrMobNo(user.getEmail(), user.getMobNo());
    User user2 = new User();
    UserDTO dto = new UserDTO();
    if (user1 == null) {
        BeanUtils.copyProperties(user, user1);
        repository.save(user1);
        return Optional.of(user1);
    } else {
        BeanUtils.copyProperties(user1, user2);
        user2.setMobNo(user.getMobNo());
        BeanUtils.copyProperties(user2, dto);
        producer.sendMessageToRabbitMq(dto);
        repository.save(user2);
        return Optional.of(user2);
    }
    }

    private static String getEmail(String token) throws JsonProcessingException {
    String clientId = "578349732074-ddo6roou2d4o05trh2ajmevnngudc39n.apps.googleusercontent.com";
    String payLoad = token.split("\\.")[1];
    String emailId = new ObjectMapper().readTree(new String(Base64.getDecoder().decode(payLoad))).get("email").asText();
    return emailId;
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
