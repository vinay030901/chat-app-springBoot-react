package com.sunstring.chat.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sunstring.chat.dto.request.RegisterRequest;
import com.sunstring.chat.entity.User;
import com.sunstring.chat.repository.UserRepository;
import com.sunstring.chat.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findUserById(String userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User createUser(RegisterRequest registerRequest) {
        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(registerRequest.getPassword());
        return userRepository.save(newUser);
    }

}
