package com.example.EmailService.Kafka;

import com.example.EmailService.Controller.EmailController;
import com.example.EmailService.Domain.HotelBooking;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {
    private static final String TOPIC = "my-topic";
    private EmailController controller;
    @Autowired
    public KafkaConsumer(EmailController controller) {
        this.controller = controller;
    }

    @KafkaListener(topics = TOPIC, groupId = "my-group")
    public void receiveBill(String message) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        HotelBooking booking = mapper.readValue(message, HotelBooking.class);
        controller.sendBillByEmail(booking);
        System.out.println("kafka Success: " + booking);
    }
}
