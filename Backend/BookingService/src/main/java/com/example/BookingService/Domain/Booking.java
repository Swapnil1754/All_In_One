package com.example.BookingService.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Booking {
    @Id
    private String bookingId;
    private Date fromDate;
    private Date toDate;
}
