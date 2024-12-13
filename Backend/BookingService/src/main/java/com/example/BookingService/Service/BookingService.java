package com.example.BookingService.Service;

import com.example.BookingService.Domain.HotelBooking;

import java.util.concurrent.CompletableFuture;

public interface BookingService {
    CompletableFuture<HotelBooking> generateHotelBill(HotelBooking booking);
}
