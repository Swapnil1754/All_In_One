package com.example.Hotels.Service;

import com.example.Hotels.Domain.Hotel;
import com.example.Hotels.Domain.Room;
import com.example.Hotels.Exceptions.OwnerNotExistsException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface HotelService {
    Hotel addHotel(byte[] image, Hotel hotel) throws OwnerNotExistsException;
    Hotel addRoom(List<Map<String, Object>> room, String registrationId) throws IOException;
    Room addRoomImages(MultipartFile[] images, String registrationId, String roomCatagory) throws IOException;
    Hotel getHotel(String registrationId);
    List<Hotel> getHotels(String ownerName);
    List<Hotel> getAll();
    List<Hotel> getHotelsInCity(String city);
    void deleteHotel(String registrationId);

}
