package com.example.NotificationService.Service;

import com.example.NotificationService.Domain.Notification;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final SimpMessagingTemplate template;

    public NotificationServiceImpl(SimpMessagingTemplate template) {
        this.template = template;
    }

    @Override
    public String getNotificationUpdate() {
        return null;
    }
//    @RabbitListener(queues = "que_notifier")
    public void handleNotification(Map<String, String> message) {
        String notify = message.get("message");
        template.convertAndSend("/topic/notifications", notify);
    }
    private String getRabbitData(Notification notification) {
        return notification.getMessage();
    }
}
