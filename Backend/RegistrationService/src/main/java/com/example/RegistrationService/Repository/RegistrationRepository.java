package com.example.RegistrationService.Repository;

import com.example.RegistrationService.Domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationRepository extends MongoRepository<User,String> {
User findByUserIdAndPassword(int userId,String password);
User findByUserId(String userId);
User findByEmail(String email);
User findByName1(String name);
User findByEmailOrMobNo(String email, String mobNo);
}
