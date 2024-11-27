package com.example.Bus.Service;

import com.example.Bus.Domain.Bus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BusService {
    Bus addBus(MultipartFile[] images, Bus bus);
    Bus getBusByBusId(String busId);
    List<Bus> getBusByOperator(String operator);
    Boolean deleteBus(String busId);
}
