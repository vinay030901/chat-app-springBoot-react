package com.sunstring.chat.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunstring.chat.config.JwtTokenProvider;
import com.sunstring.chat.dto.request.LoginRequest;
import com.sunstring.chat.dto.request.RegisterRequest;
import com.sunstring.chat.dto.response.AuthResponse;
import com.sunstring.chat.entity.User;
import com.sunstring.chat.service.UserService;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req) {
        String email = req.getEmail();
        String password = req.getPassword();
        Optional<User> user = userService.findUserByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            String token = JwtTokenProvider.generateJwtToken(user.get());
            return new ResponseEntity<>(
                    AuthResponse.builder().jwt(token).senderId(user.get().getUserId()).message("Login successful")
                            .build(),
                    HttpStatus.OK);
        } else if (user.isPresent())
            return new ResponseEntity<>(AuthResponse.builder().message("Wrong password").build(),
                    HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(AuthResponse.builder().message("This email is not registered").build(),
                HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> signupUser(@RequestBody RegisterRequest registerRequest) {
        String email = registerRequest.getEmail();
        if (userService.findUserByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(AuthResponse.builder().message("Email already exists").build());
        }
        registerRequest.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        User savedUser = userService.createUser(registerRequest);
        String token = JwtTokenProvider.generateJwtToken(savedUser);
        return ResponseEntity
                .ok(AuthResponse.builder().jwt(token).message("Success").senderId(savedUser.getUserId()).build());
    }

}
