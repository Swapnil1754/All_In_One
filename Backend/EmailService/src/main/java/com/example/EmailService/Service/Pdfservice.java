package com.example.EmailService.Service;

import com.example.EmailService.Domain.HotelBooking;

public interface Pdfservice {
    public byte[] generatePdf(HotelBooking hotelBooking);
}
