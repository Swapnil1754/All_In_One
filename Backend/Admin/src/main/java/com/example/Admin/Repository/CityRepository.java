package com.example.Admin.Repository;

import com.example.Admin.Domain.City;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CityRepository extends MongoRepository<City, String> {
    City findByCityName(String cityName);
    List<City> findByCityNameContaining(String city);
}
