package com.example.Hotels.Service;

import com.example.Hotels.Domain.Hotel;
import com.example.Hotels.Domain.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface HotelService {
    public Hotel addHotel(byte[] image, Hotel hotel);
    public Hotel addRoom(MultipartFile[] images, Room room, String registrationId) throws IOException;
}
