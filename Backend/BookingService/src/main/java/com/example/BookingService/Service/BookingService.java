package com.example.BookingService.Service;

import com.example.BookingService.Domain.HotelBooking;

public interface BookingService {
    HotelBooking generateHotelBill(HotelBooking booking);
}
