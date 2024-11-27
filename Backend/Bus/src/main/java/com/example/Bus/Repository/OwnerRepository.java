package com.example.Bus.Repository;

import com.example.Bus.Domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepository extends MongoRepository<User, String> {
    User findUserByName1(String ownerName);
}
