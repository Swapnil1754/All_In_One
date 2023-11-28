package com.example.BookingService.Controller;

import com.example.BookingService.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    private BookingService service;
    @Autowired

    public BookingController(BookingService service) {
        this.service = service;
    }
}
