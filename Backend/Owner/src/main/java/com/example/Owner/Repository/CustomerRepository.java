package com.example.Owner.Repository;

import com.example.Owner.Domain.Customers.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends MongoRepository<User, String> {
    public User findByUserId(String userId);
}
