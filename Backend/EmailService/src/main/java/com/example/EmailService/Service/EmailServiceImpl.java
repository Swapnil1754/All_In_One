package com.example.EmailService.Service;

import com.example.EmailService.Domain.Otp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
@Service
public class EmailServiceImpl implements EmailService{

    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;
    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendMailWithAttachment(String to, String subject, String text, byte[] attachment, String attachmentName) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);
        System.out.println("helper" + helper);
        ByteArrayResource resource = new ByteArrayResource(attachment);
        helper.addAttachment(attachmentName, resource);
        javaMailSender.send(message);
    }

    @Override
    public String sendSimpleMail(Otp otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(otp.getUserName());
        message.setSubject(otp.getSubject());
        message.setText(otp.getOtp());
        javaMailSender.send(message);
        return otp.getOtp();
    }
}
