package com.analyzer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.analyzer.entity.User;
import com.analyzer.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    
    @Autowired
    private UserService userserv;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user){
        userserv.registerNewUser(user);
        return "User registered successfully!!!";
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest){
        User user = userserv.verifyUserLogin(loginRequest.getEmail(), loginRequest.getPassword());

        // if(result.startsWith("Login successful")){
        //     return ResponseEntity.ok(result);
        // }
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        else{
            return ResponseEntity.status(401).body("Invalid email or password!");
        }
    }
}
