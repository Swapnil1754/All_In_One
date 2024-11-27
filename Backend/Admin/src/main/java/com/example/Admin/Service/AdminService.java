package com.example.Admin.Service;

import com.example.Admin.Domain.City;
import org.springframework.stereotype.Service;

import java.util.List;


public interface AdminService {
    City addCity(byte[] image, City city);
    List<City> getAllCities();
    boolean deleteCity(String cityName);
    List<City> searchCity(String city);
}
