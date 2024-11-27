//package com.example.NotificationService.RabbitMQ.Consumer;
//
//import com.example.NotificationService.Controller.NotificationController;
//import com.example.NotificationService.RabbitMQ.Domain.Notification;
//import org.springframework.amqp.rabbit.annotation.RabbitListener;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//@Component
//public class Consumer {
//    @Autowired
//    private NotificationController controller;
//    @RabbitListener(queues = "que_notifier")
//    public void getDataFromRabbitMQ(Notification message) {
//        com.example.NotificationService.Domain.Notification notification = new com.example.NotificationService.Domain.Notification();
//        notification.setMessage(message.getMessage());
////        controller.getNotification(notification);
//    }
//}
