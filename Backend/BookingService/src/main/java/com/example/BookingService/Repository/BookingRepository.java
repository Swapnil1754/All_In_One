package com.example.BookingService.Repository;

import com.example.BookingService.Domain.HotelBooking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepository extends MongoRepository<HotelBooking, String> {
}
