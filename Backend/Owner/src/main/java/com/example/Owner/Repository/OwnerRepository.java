package com.example.Owner.Repository;

import com.example.Owner.Domain.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface OwnerRepository extends ReactiveMongoRepository<User,String> {
    public Mono<User> findOneByUserId(String userId);
    public Mono<User> findOneByActivationKey(String activationKey);
}
