package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if(userRepository.existsByUsername(user.getUsername())) {
            return "Username already taken!";
        }
        if(userRepository.existsByEmail(user.getEmail())) {
            return "Email already in use!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername()).orElse(null);
        if(existingUser == null) return "User not found!";
        if(!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return "Invalid password!";
        }
        return "Login successful!";
    }
}
