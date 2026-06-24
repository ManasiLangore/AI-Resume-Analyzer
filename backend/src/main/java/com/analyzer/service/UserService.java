package com.analyzer.service;

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
}
