//package com.example.RegistrationService.Producer;
//
//import com.example.RegistrationService.Rabitmq.Domain.UserDTO;
//import org.springframework.amqp.core.DirectExchange;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//@Component
//public class Producer2 {
//    private RabbitTemplate template1;
//    private DirectExchange exchange;
//    @Autowired
//
//    Producer2(RabbitTemplate template1, DirectExchange exchange) {
//        this.template1 = template1;
//        this.exchange = exchange;
//    }
//    public void sendMessageToRabbitMq(UserDTO userDTO) {
//        template1.convertAndSend(exchange.getName(),"my_routing2",userDTO);
//    }
//}
