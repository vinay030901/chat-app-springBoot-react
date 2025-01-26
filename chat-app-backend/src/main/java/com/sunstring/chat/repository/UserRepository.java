package com.sunstring.chat.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sunstring.chat.entity.User;

public interface UserRepository extends MongoRepository<User, String> {

    // get user by userId
    Optional<User> findByUserId(String userId);

    // get user by email
    Optional<User> findByEmail(String email);
}
