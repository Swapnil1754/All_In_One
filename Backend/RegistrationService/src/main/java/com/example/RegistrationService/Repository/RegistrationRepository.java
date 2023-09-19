package com.example.RegistrationService.Repository;

import com.example.RegistrationService.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationRepository extends JpaRepository<User,String> {
public User findByUserIdAndPassword(int userId,String password);
public User findByUserId(String userId);
}
