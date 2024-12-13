package com.example.Hotels.Service;

import com.example.Hotels.Domain.Aminities;
import com.example.Hotels.Domain.Hotel;
import com.example.Hotels.Domain.Room;
import com.example.Hotels.Domain.User;
import com.example.Hotels.Exceptions.HotelNotFoundException;
import com.example.Hotels.Exceptions.InvalidCityException;
import com.example.Hotels.Exceptions.InvalidDataException;
import com.example.Hotels.Exceptions.OwnerNotExistsException;
import com.example.Hotels.Exceptions.RoomNotFoundException;
import com.example.Hotels.Repository.HotelRepository;
import com.example.Hotels.Repository.OwnerRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class HotelServiceImpl implements HotelService {
    private HotelRepository repository;
    private OwnerRepository ownerRepository;
    private static final Logger logger = LoggerFactory.getLogger(HotelServiceImpl.class);

    @Autowired

    public HotelServiceImpl(HotelRepository repository, OwnerRepository ownerRepository) {
        this.repository = repository;
        this.ownerRepository = ownerRepository;
    }


    @Override
    public Hotel addHotel(byte[] image, Hotel hotel) {
        logger.info("HotelServiceImpl - addHotel - started with hotel: {}", hotel);
        Optional<User> user = ownerRepository.findUserByName1(hotel.getOwnerName());
        if (!user.isPresent()) {
            throw new OwnerNotExistsException("Owner does not Exists...");
        }
        try {
            hotel.setImage(image);
            hotel.setRegistrationId(registrationNumber());
            System.out.println("Hotel data" + hotel);
            return repository.save(hotel);
        } catch (Exception e) {
            throw new HotelNotFoundException(e.getMessage());
        }
    }

    @Override
    public Hotel addRoom(List<Map<String, Object>> room, String registrationId) {
        try {
            Hotel hotel = repository.findByRegistrationId(registrationId);
            for (Map<String, Object> x : room) {
                Room room1 = new Room();
                room1.setRoomId(roomRegistrationNumber());
                room1.setRoomCategory((String) x.get("roomCatagory"));
                room1.setRoomType((String) x.get("roomType"));
                double price = Double.parseDouble(x.get("price").toString());
                room1.setPrice(price);
                room1.setAminitiesList((List<String>) x.get("aminitiesList"));
                hotel.getRooms().add(room1);
            }
            repository.save(hotel);
            return hotel;
        } catch (Exception exception) {
            throw new InvalidDataException("Entered data is invalid: "+exception.getMessage());
        }
    }

    @Override
    public Room addRoomImages(MultipartFile[] images, String registrationId, String roomCatagory) throws IOException {
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
        Optional<Room> roomOptional = hotel.getRooms().stream().filter(x-> Objects.equals(x.getRoomCategory(), roomCatagory)).findFirst();
        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();
            if (room.getImages() == null) {
                room.setImages(imgBytes);
            } else {
                room.getImages().addAll(imgBytes);
            }
            hotel.getRooms().remove(roomOptional.get());
            hotel.getRooms().add(room);
            repository.save(hotel);
            return room;
        } else {
            throw new RoomNotFoundException("No room available");
        }
    }

    @Override
    public Hotel getHotel(String registrationId) {
        try {
            return repository.findByRegistrationId(registrationId);
        } catch (Exception e) {
            throw new HotelNotFoundException("Hotel does not Exists...");
        }
    }

    @Override
    public List<Hotel> getHotels(String ownerName) {
        try {
            return repository.findByOwnerName(ownerName);
        } catch (OwnerNotExistsException e) {
            throw new OwnerNotExistsException("Owner does not exists: " + e.getMessage());
        } catch (Exception e) {
            throw new HotelNotFoundException("Hotels does not found");
        }
    }

    @Override
    public List<Hotel> getAll() {
        try {
            List<Hotel> list = repository.findAll();
            return list;
        } catch (Exception e) {
            throw new HotelNotFoundException("Hotels does not found");
        }
    }

    @Override
    public List<Hotel> getHotelsInCity(String city) {
        try {
            return repository.findByCity(city);
        } catch (Exception e) {
            throw new InvalidCityException("Invalid City...: "+e.getMessage());
        }
    }

    @Override
    public Boolean deleteHotel(String registrationId) {
        try {
            repository.delete(repository.findByRegistrationId(registrationId));
            return true;
        } catch (Exception e) {
            throw new HotelNotFoundException("Error while Deleting Hotel..."+e.getMessage());
        }
    }

    @Override
    public Hotel deleteRoom(String registrationId, String roomId) {
        try {
            Hotel hotel = repository.findByRegistrationId(registrationId);
            Optional<Room> room = hotel.getRooms().stream().filter((x)->x.getRoomId().equals(roomId)).findFirst();
            if (room.isPresent()){
                hotel.getRooms().remove(room.get());
                repository.save(hotel);
                return hotel;
            }
            return hotel;
        } catch (Exception e) {
            throw new RoomNotFoundException("Error while Deleting room..."+e.getMessage());
        }
    }

    private String registrationNumber() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 7).toUpperCase();
    }
    private String roomRegistrationNumber() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 5).toUpperCase();
    }
}
