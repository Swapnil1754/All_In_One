package com.example.BookingService.Kafka;

import com.example.BookingService.Domain.HotelBooking;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {
    private static String TOPIC = "my-topic";
    @Autowired
    private KafkaTemplate<String, HotelBooking> template;
    public void sendBill(String key, HotelBooking booking) throws JsonProcessingException {
        System.out.println("key: "+key+"booking"+booking);
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = mapper.writeValueAsString(booking);
        template.send(TOPIC, key, booking);
    }
}
