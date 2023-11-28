package com.example.BookingService.Service;

import com.example.BookingService.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingServiceImpl implements BookingService{
    private BookingRepository repository;
    @Autowired

    public BookingServiceImpl(BookingRepository repository) {
        this.repository = repository;
    }
}
