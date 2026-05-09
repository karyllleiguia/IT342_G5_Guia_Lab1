package com.example.demo.features.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public User getMe(@RequestParam String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
