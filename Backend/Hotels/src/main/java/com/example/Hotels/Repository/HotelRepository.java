package com.example.Hotels.Repository;

import com.example.Hotels.Domain.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends MongoRepository<Hotel,Integer> {
    public Hotel findByRegistrationId(String regId);
    public List<Hotel> findByOwnerName(String ownerName);
}
