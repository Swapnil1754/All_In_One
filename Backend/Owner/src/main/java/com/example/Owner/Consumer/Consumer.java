package com.example.Owner.Consumer;

import com.example.Owner.Domain.User;
import com.example.Owner.Rabitmq.Domain.UserDTO;
import com.example.Owner.Service.OwnerServiceImpl;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    private OwnerServiceImpl service;
    @RabbitListener(queues = "my_queue")
    public void getDataFromRabbit(User user) {
//        User user = new User();
//        com.example.Owner.Domain.Customers.User user1 = new com.example.Owner.Domain.Customers.User();
//        user.setUserId(userDTO.getUserId());
//        user.setActivated(userDTO.isActivated());
//        user.setOwner(userDTO.isOwner());
//        user.setEmail(userDTO.getEmail());
//        user.setName1(userDTO.getName1());
//        user.setMobNo(userDTO.getMobNo());
//        user.setPassword(userDTO.getPassword());
//        user.setCity(userDTO.getCity());
        service.saveUser(user);
    }
}
