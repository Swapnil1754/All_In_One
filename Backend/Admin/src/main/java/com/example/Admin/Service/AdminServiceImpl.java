package com.example.Admin.Service;

import com.example.Admin.Domain.City;
import com.example.Admin.Repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    private CityRepository cityRepository;
    @Autowired
    public AdminServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public City addCity(byte[] image, City city) {
        City city1 = cityRepository.findByCityName(city.getCityName());
        if (city1 == null) {
            city.setCityImage(image);
            cityRepository.save(city);
            return city;
        } else {
            throw new RuntimeException("City is Already Exists...!!!");
        }
    }

    @Override
    public List<City> getAllCities() {
        System.out.println("reaching");
        return cityRepository.findAll();
    }

    @Override
    public boolean deleteCity(String cityName) {
        return false;
    }

    @Override
    public List<City> searchCity(String city) {
        List<City> cities = cityRepository.findByCityNameContaining(city);
        System.out.println("cities: " +cities);
        return cities;
    }
}
