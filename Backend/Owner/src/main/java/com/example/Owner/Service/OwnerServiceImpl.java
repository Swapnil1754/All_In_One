package com.example.Owner.Service;

import com.example.Owner.Domain.User;
import com.example.Owner.Exceptions.OwnerNotFoundException;
import com.example.Owner.Repository.CustomerRepository;
import com.example.Owner.Repository.OwnerRepository;
import com.example.Owner.Utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class OwnerServiceImpl implements OwnerService {
    @Autowired
    private OwnerRepository repository;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public User saveUser(User user) {
        if (user.getUserId().isEmpty()) {
            throw new OwnerNotFoundException("Owner does not Exists...");
        }
        if (user.isOwner()) {
            return repository.save(user).block();
        }
        com.example.Owner.Domain.Customers.User user1 = new com.example.Owner.Domain.Customers.User();
        user1.setUserId(user.getUserId());
        user1.setOwner(user.isOwner());
        user1.setName1(user.getName1());
        user1.setEmail(user.getEmail());
        user1.setActivated(user.isActivated());
        user1.setPassword(user.getPassword());
        user1.setMobNo(user.getMobNo());
        user1.setCity(user.getCity());
        customerRepository.save(user1);
        return user;
    }

    @Override
    public Mono<User> getUserWithAuthorities() {
        return SecurityUtils.getCurrentUserLogin().flatMap(repository::findOneByUserId);
    }

    @Override
    public Mono<User> activateRegistration(String key) {
        return repository.findOneByActivationKey(key).flatMap(user -> {
            com.example.Owner.Domain.Customers.User user1 = customerRepository.findByUserId(user.getUserId());
            user.setActivated(true);
            user.setActivationKey(null);
            if (user1 != null) {
                customerRepository.save(user1);
            }
            saveUser(user);
            return null;
        });
    }
}
