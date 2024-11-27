package com.example.EmailService.Controller;

import com.example.EmailService.Domain.HotelBooking;
import com.example.EmailService.Domain.Otp;
import com.example.EmailService.Service.EmailService;
import com.example.EmailService.Service.Pdfservice;
import com.example.EmailService.Service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.UUID;
@RestController
@RequestMapping("/api/email/")
public class EmailController {
    @Autowired
    private Pdfservice pdfservice;
    private EmailService emailService;
    private SmsService smsService;
    @Autowired

    public EmailController(Pdfservice pdfservice, EmailService emailService, SmsService smsService) {
        this.pdfservice = pdfservice;
        this.emailService = emailService;
        this.smsService = smsService;
    }
    @PostMapping("/send-bill-by-email")
    public void sendBillByEmail(HotelBooking bill) {
        System.out.println("Bill: " + bill);
        try {
            byte[] pdfBytes = pdfservice.generatePdf(bill);
            String to = bill.getUserName();
            String subject = "Hotel Booking Bill";
            String text = "Please find the attached bill for your reference.";
            String attachmentName = "ProfessionalBill.pdf";
            emailService.sendMailWithAttachment(to, subject, text, pdfBytes, attachmentName);
        } catch (MessagingException exception) {
            exception.printStackTrace();
        }
    }
    @GetMapping("/get-otp/{userName}")
    public ResponseEntity<String> getOtpByMail(@PathVariable String userName) {
        Otp otp = new Otp(userName, otpGenerator(), "OTP Verification for AllInOne.com");
        return new ResponseEntity<>(emailService.sendSimpleMail(otp), HttpStatus.OK);
    }
    @GetMapping("/get-otpBySms/{mobileNumber}")
    public ResponseEntity<String> getOtpBySms(@PathVariable String mobileNumber) {
        return new ResponseEntity<>(smsService.sendOtpBySms(otpGenerator(), mobileNumber), HttpStatus.OK);
    }
    private String otpGenerator() {
       return UUID.randomUUID().toString().replace("-", "").substring(0, 6).toUpperCase();
    }
}
