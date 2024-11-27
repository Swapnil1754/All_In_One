package com.example.Admin.Controller;

import com.example.Admin.Domain.City;
import com.example.Admin.Service.AdminService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private AdminService adminService;
    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    @PostMapping("/add-city")
    public ResponseEntity<?> addCity(@RequestParam("cityImage")MultipartFile file, City city) throws IOException {
        return new ResponseEntity<>(adminService.addCity(file.getBytes(), city), HttpStatus.OK);
    }
    @GetMapping("get-cities")
    public ResponseEntity<?> getAllCities() {
        return new ResponseEntity<>(adminService.getAllCities(), HttpStatus.OK);
    }
    @GetMapping("search/{cityQuery}")
    public ResponseEntity<?> searchCities(@PathVariable String cityQuery, Principal principal) {
        System.out.println("Searching... "+cityQuery);
        return new ResponseEntity<>(adminService.searchCity(cityQuery), HttpStatus.OK);
    }
}
