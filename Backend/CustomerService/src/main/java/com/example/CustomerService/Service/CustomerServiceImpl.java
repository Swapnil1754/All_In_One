package com.example.CustomerService.Service;

import com.example.CustomerService.Domain.User;
import com.example.CustomerService.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {
    private CustomerRepository repository;
@Autowired
    public CustomerServiceImpl(CustomerRepository repository) {
        this.repository = repository;
    }

    @Override
    public User saveUser(User user) {
        if (user != null) {
            return repository.save(user);
        } else throw new RuntimeException("User Not Added...!!!");
    }
}
