package com.example.BookingService.Service;

import com.example.BookingService.Domain.HotelBooking;
import com.example.BookingService.Kafka.KafkaProducer;
import com.example.BookingService.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class BookingServiceImpl implements BookingService{
    private BookingRepository repository;
    @Autowired
    private KafkaProducer producer;
    @Autowired

    public BookingServiceImpl(BookingRepository repository) {
        this.repository = repository;
    }
    private String billIdGenerator() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 15).toUpperCase();
    }

    @Override
    @Async("asyncEmail")
    public HotelBooking generateHotelBill(HotelBooking booking) {
        try {
            String key = "my-key";
            HotelBooking book = new HotelBooking();
            book.setBookingId(billIdGenerator());
            book.setUserName(booking.getUserName());
            book.setMobNo(booking.getMobNo());
            book.setHotelName(booking.getHotelName());
            book.setRoomCatagory(booking.getRoomCatagory());
            book.setRoomType(booking.getRoomType());
            book.setNoOfDays(booking.getNoOfDays());
            book.setNoOfPeoples(booking.getNoOfPeoples());
            book.setFromDate(booking.getFromDate());
            book.setToDate(booking.getToDate());
            book.setCost(booking.getCost());
            book.setNoOfRooms(booking.getNoOfRooms());
            producer.sendBill(key, book);
            return repository.save(book);
        } catch (Exception e) {
            throw new RuntimeException("Error while generating bill...");
        }
    }
}
