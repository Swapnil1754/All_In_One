package com.example.CustomerService.Controller;

import com.example.CustomerService.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    private CustomerService service;
@Autowired
    public CustomerController(CustomerService service) {
        this.service = service;
    }
}
