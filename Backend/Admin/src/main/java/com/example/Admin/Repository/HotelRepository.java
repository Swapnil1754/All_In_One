package com.example.Admin.Repository;

import com.example.Admin.Domain.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HotelRepository extends MongoRepository<Hotel, String> {
}
