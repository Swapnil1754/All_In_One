package com.example.EmailService.Service;

import com.example.EmailService.Domain.Otp;

import javax.mail.MessagingException;

public interface EmailService {
    void sendMailWithAttachment(String to, String subject, String text, byte[] attachment, String attachmentName) throws MessagingException;
    String sendSimpleMail(Otp otp);
}
