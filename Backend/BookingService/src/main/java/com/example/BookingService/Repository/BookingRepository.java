package com.example.BookingService.Repository;

import com.example.BookingService.Domain.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepository extends MongoRepository<Booking, String> {
}
