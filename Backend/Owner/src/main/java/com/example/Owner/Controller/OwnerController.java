package com.example.Owner.Controller;

import com.example.Owner.Domain.User;
import com.example.Owner.Exceptions.OwnerNotFoundException;
import com.example.Owner.Service.OwnerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RequestMapping("/api/owner")
@RestController
public class OwnerController {
    private OwnerServiceImpl service;
    @Autowired

    public OwnerController(OwnerServiceImpl service) {
        this.service = service;
    }
    @GetMapping("/fetch")
    public Mono<User> fetchUser() throws OwnerNotFoundException {
        System.out.println("Reaching");
        return service.getUserWithAuthorities()
                .map(User::new)
                .switchIfEmpty(Mono.error(new OwnerNotFoundException()));
    }
    @GetMapping("/activate")
    public Mono<Void> activateUser(@RequestParam(value = "key") String key) {
        return service.activateRegistration(key)
                .switchIfEmpty(Mono.error(new OwnerNotFoundException()))
                .then();
    }
    @GetMapping("/hello")
    public ResponseEntity<?> hello() {
        return new ResponseEntity<>("Hi...", HttpStatus.OK);
    }
}
