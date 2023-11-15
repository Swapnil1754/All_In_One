package com.example.RegistrationService.Repository;

import com.example.RegistrationService.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface RegistrationRepository extends JpaRepository<User,String> {
User findByUserIdAndPassword(int userId,String password);
User findByUserId(String userId);
User findByEmail(String email);
User findByName1(String name);
}
