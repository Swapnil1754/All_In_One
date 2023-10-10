package com.example.CustomerService.Consumer;

import com.example.CustomerService.Domain.User;
import com.example.CustomerService.RabbitMq.Domain.UserDTO;
import com.example.CustomerService.Service.CustomerService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    private CustomerService service;
    @RabbitListener(queues = "my_queue1")
    public void getDataFromRabbit(UserDTO userDTO) {
        User user = new User();
        user.setUserId(userDTO.getUserId());
        user.setActivated(userDTO.isActivated());
        user.setOwner(userDTO.isOwner());
        user.setEmail(userDTO.getEmail());
        user.setName1(userDTO.getName1());
        user.setMobNo(userDTO.getMobNo());
        user.setPassword(userDTO.getPassword());
        user.setCity(userDTO.getCity());
        service.saveUser(user);
    }
}
