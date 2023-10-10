package com.example.Owner.Service;

import com.example.Owner.Domain.User;
import reactor.core.publisher.Mono;

public interface OwnerService {
    public User saveUser(User user);
    public Mono<User> getUserWithAuthorities();
    public Mono<User> activateRegistration(String key);
}
