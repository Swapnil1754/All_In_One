package com.example.BookingService.Service;

import com.example.BookingService.Domain.HotelBooking;
import com.example.BookingService.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class BookingServiceImpl implements BookingService{
    private BookingRepository repository;
    @Autowired

    public BookingServiceImpl(BookingRepository repository) {
        this.repository = repository;
    }
    private String billIdGenerator() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 15).toUpperCase();
    }

    @Override
    public HotelBooking generateHotelBill(HotelBooking booking) {
        try {
            HotelBooking book = new HotelBooking();
            book.setBookingId(billIdGenerator());
            book.setHotelName(booking.getHotelName());
            book.setRoomCatagory(booking.getRoomCatagory());
            book.setRoomType(booking.getRoomType());
            book.setNoOfDays(booking.getNoOfDays());
            book.setNoOfPeoples(booking.getNoOfPeoples());
            book.setFromDate(booking.getFromDate());
            book.setToDate(booking.getToDate());
            book.setCost(booking.getCost());
            book.setNoOfRooms(booking.getNoOfRooms());
            return repository.save(book);
        } catch (Exception e) {
            throw new RuntimeException("Error while generating bill...");
        }
    }
}
