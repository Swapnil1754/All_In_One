package com.example.NotificationService.Controller;

import com.example.NotificationService.Domain.Notification;
import com.example.NotificationService.Service.DialogflowService;
import com.example.NotificationService.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/app/notification/v1")
public class NotificationController {
    @Autowired
    private NotificationService service;
    @Autowired
    private DialogflowService dialogflowService;

    public NotificationController(NotificationService service) {
        this.service = service;
    }
@GetMapping("get-notify")
    public ResponseEntity<String> getNotification(Notification notification) throws Exception {
        System.out.println(notification.getMessage());
//    System.out.println("Dialog: " + dialogflowService.detectIntent("Hi"));
        return new ResponseEntity<>(notification.getMessage(), HttpStatus.OK);
    }
    @GetMapping("test-notify")
    public ResponseEntity<String> testNotify() throws Exception {
        System.out.println("Dialog: " + dialogflowService.detectIntent("Hi"));
        return new ResponseEntity<>(dialogflowService.detectIntent("Hi"), HttpStatus.OK);
    }
}
