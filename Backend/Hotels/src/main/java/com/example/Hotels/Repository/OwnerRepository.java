package com.example.Hotels.Repository;

import com.example.Hotels.Domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OwnerRepository extends MongoRepository<User,String> {
    public User findUserByName1(String ownerName);
}
