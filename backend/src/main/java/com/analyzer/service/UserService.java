package com.analyzer.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.analyzer.entity.User;
import com.analyzer.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepo;

    public User registerNewUser(User user){
        return userRepo.save(user);
    }

    // New Login verification method
    public String verifyUserLogin(String email, String password){
        Optional<User> existingUser = userRepo.findAll().stream()
            .filter(u -> u.getEmail().equalsIgnoreCase(email))
            .findFirst();

        if(existingUser.isEmpty()){
            return "User not found with this email!";
        }
        
        User user = existingUser.get();

        if(user.getPassword().equals(password)){
            return "Login successful! Welcome back "+ user.getFullName();
        }
        else{
            return "Incorrect password! Please try again.";
        }
    }
}
