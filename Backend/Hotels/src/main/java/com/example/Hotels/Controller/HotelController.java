package com.example.Hotels.Controller;

import com.example.Hotels.Domain.Hotel;
import com.example.Hotels.Domain.Image;
import com.example.Hotels.Domain.Room;
import com.example.Hotels.Service.HotelService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/hotel")
@RestController
public class HotelController {
    private HotelService hotelService;
    private ResponseEntity responseEntity;
    @Autowired
    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }
    @PostMapping("/add-hotel")
    public ResponseEntity<Hotel> addHotel(@RequestParam("file")MultipartFile file, @RequestParam String data) throws IOException {
    ObjectMapper objectMapper =new ObjectMapper();
    Hotel hotel1 = objectMapper.readValue(data, Hotel.class);
        return new ResponseEntity<>(hotelService.addHotel(file.getBytes(), hotel1), HttpStatus.OK);
    }
    @PutMapping("/{registrationId}/add-room")
    public ResponseEntity<?> addRoom(@RequestParam("files") MultipartFile[] multipartFile, @RequestParam("data") String data, @PathVariable String registrationId) throws IOException {
        System.out.println(registrationId);
        System.out.println(data);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        Room room = objectMapper.readValue(data, Room.class);
        return new ResponseEntity<>(hotelService.addRoom(multipartFile,room,registrationId),HttpStatus.OK);
    }
}
