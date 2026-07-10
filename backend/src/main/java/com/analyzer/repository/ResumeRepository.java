package com.analyzer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.analyzer.entity.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long>{
    List<Resume> findAllByOrderByUploadTimeDesc();

    List<Resume> findByUserId(Long userId);
}
