package com.example.Admin.Repository;

import com.example.Admin.Domain.Owner;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMongoRepository extends MongoRepository<Owner, String> {
}
