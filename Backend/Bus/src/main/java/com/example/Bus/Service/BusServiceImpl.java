package com.example.Bus.Service;

import com.example.Bus.Domain.Bus;
import com.example.Bus.Domain.User;
import com.example.Bus.Exception.BusAlreadyExistsException;
import com.example.Bus.Exception.BusNotFoundException;
import com.example.Bus.Exception.UserNotFoundException;
import com.example.Bus.Repository.BusRepository;
import com.example.Bus.Repository.OwnerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class BusServiceImpl implements BusService {
    private BusRepository repository;
    private OwnerRepository ownerRepository;

    @Autowired

    public BusServiceImpl(BusRepository repository, OwnerRepository ownerRepository) {
        this.repository = repository;
        this.ownerRepository = ownerRepository;
    }

    @Override
    public Bus addBus(MultipartFile[] images, Bus bus) {
        try {
            User user = ownerRepository.findUserByName1(bus.getOperatorName());
            if (user == null) {
                throw new UserNotFoundException("User Not Exists...");
            }
            Bus bus1 = new Bus();
            BeanUtils.copyProperties(bus, bus1);
            List<List<Byte>> imgBytes = new ArrayList<>();
            byte[] imageB;
            for (MultipartFile file: images) {
                List<Byte> bytes = new ArrayList<>();
                imageB = file.getBytes();
                for (int i = 0; i < imageB.length; i++) {
                    Byte b = imageB[i];
                    bytes.add(b);
                }
                imgBytes.add(bytes);
            }
            bus1.setImages(imgBytes);
            return repository.save(bus1);
        } catch (Exception e) {
            throw new BusAlreadyExistsException("Error while adding bus....:" + e.getMessage());
        }
    }

    @Override
    public Bus getBusByBusId(String busId) {
        try {
            return repository.findById(busId).get();
        } catch (Exception e) {
            throw new BusNotFoundException("Bus does Not exists: " + e.getMessage());
        }
    }

    @Override
    public List<Bus> getBusByOperator(String operator) {
        User user = ownerRepository.findUserByName1(operator);
        if (user == null) {
            throw new UserNotFoundException("user not exists...");
        }
        return repository.findByOperatorName(operator);
    }

    @Override
    public Boolean deleteBus(String busId) {
        try {
            repository.delete(repository.findById(busId).get());
            return true;
        } catch (Exception e) {
            throw new BusNotFoundException("Bus not exists...: " + e.getMessage());
        }
    }
}
