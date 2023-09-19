package com.example.RegistrationService.Encryption;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class UPISecurity {
    public UPISecurity() {
    }
    public SecretKey genrateKey() throws NoSuchAlgorithmException {
        byte[] seed = "RSS2221".getBytes();
        KeyGenerator generator = KeyGenerator.getInstance("AES");
        SecureRandom random = new SecureRandom(seed);
        generator.init(128,random);
        return generator.generateKey();
    }

    public String encrypt(String message, SecretKey enc_key) throws Exception {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE,enc_key);
            byte[] bytes = cipher.doFinal(message.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(bytes);
        } catch (BadPaddingException var4) {
            throw new Exception("Invalid input String");
        }
    }
    public String decrypt(String message, SecretKey enc_key) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE,enc_key);
        byte[] bytes = cipher.doFinal(Base64.getDecoder().decode(message));
        return new String(bytes,StandardCharsets.UTF_8);
    }
}
