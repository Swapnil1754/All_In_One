package com.example.Admin.Repository;

import com.example.Admin.Domain.City;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CityRepository extends MongoRepository<City, String> {
    City findByCityName(String cityName);
}
