package com.sunstring.chat.service;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.sunstring.chat.dto.request.RegisterRequest;
import com.sunstring.chat.entity.User;

@Component
public interface UserService {

    // find user by user id
    Optional<User> findUserById(String userId);

    // find user by email
    Optional<User> findUserByEmail(String email);

    // create user
    User createUser(RegisterRequest user);
}
