package com.example.Hotels.Service;

import com.example.Hotels.Domain.Hotel;
import com.example.Hotels.Domain.Room;
import com.example.Hotels.Domain.User;
import com.example.Hotels.Exceptions.OwnerNotExistsException;
import com.example.Hotels.Repository.HotelRepository;
import com.example.Hotels.Repository.OwnerRepository;
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
    private OwnerRepository ownerRepository;

    @Autowired

    public HotelServiceImpl(HotelRepository repository, OwnerRepository ownerRepository) {
        this.repository = repository;
        this.ownerRepository = ownerRepository;
    }


    @Override
    public Hotel addHotel(byte[] image, Hotel hotel) throws OwnerNotExistsException {
        try {
            User user = ownerRepository.findUserByName1(hotel.getOwnerName());
            if (user == null) {
                throw new OwnerNotExistsException();
            }
            hotel.setImage(image);
            hotel.setRegistrationId(registrationNumber());
            System.out.println("Hotel data" + hotel);
            return repository.save(hotel);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
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
        }
        room.setImages(imgBytes);
        List<Room> rooms = hotel.getRooms();
        rooms.add(room);
        hotel.setRooms(rooms);
        repository.save(hotel);
        return hotel;
    }

    @Override
    public Hotel getHotel(String registrationId) {
        return repository.findByRegistrationId(registrationId);
    }

    @Override
    public List<Hotel> getHotels(String ownerName) {
        List<Hotel> list = repository.findByOwnerName(ownerName);
        for (Hotel hotel : list) {
            System.out.println(hotel);
        }
        return repository.findByOwnerName(ownerName);
    }

    @Override
    public List<Hotel> getAll() {
        List<Hotel> list = repository.findAll();
        return list;
    }

    @Override
    public List<Hotel> getHotelsInCity(String city) {
        return repository.findByCity(city);
    }

    private String registrationNumber() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 7).toUpperCase();
    }
}
