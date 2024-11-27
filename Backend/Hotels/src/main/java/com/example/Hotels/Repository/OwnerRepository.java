package com.example.Hotels.Repository;

import com.example.Hotels.Domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OwnerRepository extends MongoRepository<User,String> {
    Optional<User> findUserByName1(String ownerName);
}
