package com.example.CustomerService.Repository;

import com.example.CustomerService.Domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends MongoRepository<User, String> {
}
