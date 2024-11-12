package com.example.BookingService.Service;

import com.example.BookingService.Domain.HotelBooking;
import com.example.BookingService.Kafka.KafkaProducer;
import com.example.BookingService.RabbitMQ.DTO.Notification;
//import com.example.BookingService.RabbitMQ.Producer.Producer;
import com.example.BookingService.Repository.BookingRepository;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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
    private RabbitTemplate template;
//    @Autowired
//    private Producer rabbitProducer;
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
//        Notification notification = new Notification();
        String notification = "{\"message\":\" Your Hotel Booking has been confirmed...!!!\"}";
        MessageProperties properties = new MessageProperties();
        properties.setContentType(MessageProperties.CONTENT_TYPE_JSON);
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
            book.setMessage("Your Hotel Booking has been confirmed...!!!");
//            notification.setMessage("Your Hotel Booking has been confirmed...!!!");
            producer.sendBill(key, book);
//            rabbitProducer.sendMessageToRabbitMQ(notification);
            Message message = new Message(notification.getBytes(), properties);
            template.send("que_notifier", message);
            repository.save(book);
            return book;
        } catch (Exception e) {
            throw new RuntimeException("Error while generating bill...");
        }
    }
}
