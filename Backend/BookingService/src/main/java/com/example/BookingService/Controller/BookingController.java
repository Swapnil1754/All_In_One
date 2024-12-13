package com.example.BookingService.Controller;

import com.example.BookingService.Domain.HotelBooking;
import com.example.BookingService.Service.BookingService;
import com.example.BookingService.Service.SmsService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    private BookingService service;
    private SmsService smsService;
    @Autowired

    public BookingController(BookingService service, SmsService smsService) {
        this.service = service;
        this.smsService = smsService;
    }
    @PostMapping("initiatePayment")
    public String payNow(@RequestBody Map<String, Object> map) throws RazorpayException {
        int amount = Integer.parseInt(map.get("amount").toString());
        System.out.println("amount"+amount);
        RazorpayClient client = new RazorpayClient("rzp_test_hFzB6xsAnc60ru", "nnYlXV9zhyorPDU0jndht5j4");
        JSONObject object = new JSONObject();
        object.put("amount", amount*100);
        object.put("currency", map.get("currency"));
        object.put("receipt", "txn_"+System.currentTimeMillis());
        Order order = client.orders.create(object);
        return order.toString();
    }
    @PostMapping("generate/hotel-bill")
    public ResponseEntity<?> generateBill(@RequestBody HotelBooking booking) {
        smsService.sendSms(booking.getMobNo(), "Hey..." + booking.getUserName() + " Your Booking for " + booking.getHotelName() + " is Successful...!!!");
        CompletableFuture<HotelBooking> completableFuture = service.generateHotelBill(booking);
        HotelBooking booking1 = completableFuture.join();
        System.out.println("booking1: " + booking1 );
        return new ResponseEntity<>(booking1, HttpStatus.OK);
    }
}
