package com.example.Bus.Repository;

import com.example.Bus.Domain.Bus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRepository extends MongoRepository<Bus, String> {
    List<Bus> findByOperatorName(String operator);
}
