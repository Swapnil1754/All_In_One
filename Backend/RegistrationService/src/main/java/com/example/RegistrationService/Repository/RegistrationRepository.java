package com.example.RegistrationService.Repository;

import com.example.RegistrationService.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface RegistrationRepository extends JpaRepository<User,String> {
public User findByUserIdAndPassword(int userId,String password);
public User findByUserId(String userId);
public User findByEmail(String email);
public User findByName1(String name);
}
