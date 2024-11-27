package com.example.RegistrationService.Service;

import com.example.RegistrationService.Domain.User;
import com.example.RegistrationService.Encryption.UPISecurity;
import com.example.RegistrationService.Repository.RegistrationRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.crypto.SecretKey;

import java.security.NoSuchAlgorithmException;

import static com.mongodb.assertions.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class RegistrationServiceImplTest {
    @Mock
    private RegistrationRepository repository;
    @Mock
    private UPISecurity upiSecurity;
    @InjectMocks
    private RegistrationServiceImpl registrationService;
    private SecretKey key;

    public RegistrationServiceImplTest() throws NoSuchAlgorithmException {
    }

    @Before
    public void setUp() throws NoSuchAlgorithmException {
        MockitoAnnotations.openMocks(this);
        key = upiSecurity.genrateKey();
        when(upiSecurity.genrateKey()).thenReturn(key);
    }
    @Test
    public void testFindUser_Success() throws Exception {
        // Test input
        String userId = "testUser";
        String password = "encrypted123";
        String encryptedPassword = "encrypted123";

        // Mock user data
        User user = new User();
        user.setUserId(userId);
        user.setPassword(encryptedPassword);

        // Mock repository and encryption behaviors
        when(repository.findById(userId)).thenReturn(java.util.Optional.of(user));
        when(repository.findByUserId(userId)).thenReturn(user);
        when(upiSecurity.encrypt(password, key)).thenReturn(encryptedPassword);

        // Call the service method
        User result = registrationService.findUser(userId, password);
        // Verify interactions
//        verify(repository).findById(userId);
        verify(repository).findByUserId(userId);
//        verify(upiSecurity).encrypt(password, key);
    }

}
