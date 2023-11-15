package com.example.Hotels.Repository;

import com.example.Hotels.Domain.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends MongoRepository<Hotel,String> {
    Hotel findByRegistrationId(String regId);
    List<Hotel> findByOwnerName(String ownerName);
    List<Hotel> findByCity(String city);
}
