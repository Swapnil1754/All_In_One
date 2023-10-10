package com.example.RegistrationService.Producer;

import com.example.RegistrationService.Rabitmq.Domain.UserDTO;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {
    private RabbitTemplate template;
    private DirectExchange exchange;
    @Autowired

    Producer(RabbitTemplate template, DirectExchange exchange) {
        this.template = template;
        this.exchange = exchange;
    }
    public void sendMessageToRabbitMq(UserDTO userDTO) {
        template.convertAndSend(exchange.getName(),"my_routing",userDTO);
    }
}
