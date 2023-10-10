package com.example.Hotels.Service;

import com.example.Hotels.Domain.Hotel;
import com.example.Hotels.Domain.Room;
import com.example.Hotels.Exceptions.OwnerNotExistsException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HotelService {
    public Hotel addHotel(byte[] image, Hotel hotel) throws OwnerNotExistsException;
    public Hotel addRoom(MultipartFile[] images, Room room, String registrationId) throws IOException;
    public Hotel getHotel(String registrationId);
    public List<Hotel> getHotels(String ownerName);
}
