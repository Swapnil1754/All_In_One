//package com.example.BookingService.RabbitMQ.Producer;
//
//import com.example.BookingService.RabbitMQ.DTO.Notification;
//import org.springframework.amqp.core.DirectExchange;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//@Component
//public class Producer {
//    private RabbitTemplate template;
//    private DirectExchange exchange;
//@Autowired
//    public Producer(RabbitTemplate template, DirectExchange exchange) {
//        this.template = template;
//        this.exchange = exchange;
//    }
//    public void sendMessageToRabbitMQ(Notification message) {
//        template.convertAndSend(exchange.getName(), "notify_message", message);
//    }
//}
