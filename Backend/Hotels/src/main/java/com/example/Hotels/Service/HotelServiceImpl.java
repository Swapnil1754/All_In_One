package com.example.Hotels.Service;

import com.example.Hotels.Domain.Hotel;
import com.example.Hotels.Domain.Room;
import com.example.Hotels.Repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class HotelServiceImpl implements HotelService {
    private HotelRepository repository;

    @Autowired
    public HotelServiceImpl(HotelRepository repository) {
        this.repository = repository;
    }

    @Override
    public Hotel addHotel(byte[] image, Hotel hotel) {
        hotel.setImage(image);
        hotel.setRegistrationId(registrationNumber());
        return repository.save(hotel);
    }

    @Override
    public Hotel addRoom(MultipartFile[] images, Room room, String registrationId) throws IOException {
        Hotel hotel = repository.findByRegistrationId(registrationId);
        List<List<Byte>> imgBytes = new ArrayList<>();
        byte[] imageB;
        for (MultipartFile multipartFile : images) {
            List<Byte> bytes = new ArrayList<>();
            imageB = multipartFile.getBytes();
            for (int i = 0; i < imageB.length; i++) {
                Byte b = imageB[i];
                bytes.add(b);
            }
            imgBytes.add(bytes);
//            FileOutputStream fileOutputStream = new FileOutputStream(multipartFile.getOriginalFilename());
//            fileOutputStream.write(imageB);
        }
        room.setImages(imgBytes);
        List<Room> rooms = hotel.getRooms();
        rooms.add(room);
        hotel.setRooms(rooms);
        repository.save(hotel);
        return hotel;
    }

    private String registrationNumber() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 7).toUpperCase();
    }
}
