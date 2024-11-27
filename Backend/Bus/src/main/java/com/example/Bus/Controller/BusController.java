package com.example.Bus.Controller;

import com.example.Bus.Domain.Bus;
import com.example.Bus.Service.BusService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/bus")
public class BusController {
    private BusService service;
    @Autowired

    public BusController(BusService service) {
        this.service = service;
    }
    @PostMapping("/add-bus")
    public ResponseEntity<Bus> addNewBus(@RequestParam("file")MultipartFile[] files,@RequestPart("bus") String data) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Bus bus = mapper.readValue(data, Bus.class);
        return new ResponseEntity<>(service.addBus(files, bus), HttpStatus.OK);
    }
    @DeleteMapping("/delete-bus/{busId}")
    public ResponseEntity<?> deleteBus(@PathVariable String busId) {
        return new ResponseEntity<>(service.deleteBus(busId), HttpStatus.OK);
    }
    @GetMapping("get-bus/{busId}")
    public ResponseEntity<Bus> getBusByBusId(@PathVariable String busId) {
        return new ResponseEntity<>(service.getBusByBusId(busId), HttpStatus.OK);
    }
    @GetMapping("/get-buses/{operator}")
    public ResponseEntity<?> getAllBusesByOperator(@PathVariable String operator) {
        return new ResponseEntity<>(service.getBusByOperator(operator), HttpStatus.OK);
    }
}
