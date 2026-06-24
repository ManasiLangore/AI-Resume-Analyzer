package com.analyzer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.analyzer.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    
}
