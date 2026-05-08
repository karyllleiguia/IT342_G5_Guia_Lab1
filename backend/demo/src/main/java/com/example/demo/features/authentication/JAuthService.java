package com.example.demo.features.authentication;

import org.springframework.stereotype.Service;

@Service
public class JAuthService {

    public String login(String email, String password) {
        return "Login successful";
    }
}