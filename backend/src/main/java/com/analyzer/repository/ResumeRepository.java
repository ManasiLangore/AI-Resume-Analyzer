package com.analyzer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.analyzer.entity.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long>{
    
}
