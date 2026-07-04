package com.analyzer.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "resumes")
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    private String filePath;
    private LocalDateTime uploadTime;

    //AI INtegration fields
    private int matchScore;

    @Column(name = "analysis_report", columnDefinition = "LONGTEXT")
    private String analysisReport;

    @PrePersist
    protected void onCreate(){
        this.uploadTime = LocalDateTime.now();
    }


    public Resume() {}

    public Resume(String fileName, String fileType, String filePath, LocalDateTime uploadTime) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
        this.uploadTime = uploadTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public LocalDateTime getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(LocalDateTime uploadTime) {
        this.uploadTime = uploadTime;
    }

    public int getMatchScore() { 
        return matchScore; 
    }
    public void setMatchScore(int matchScore) { 
        this.matchScore = matchScore; 
    }

    public String getAnalysisReport() { 
        return analysisReport; 
    }
    public void setAnalysisReport(String analysisReport) { 
        this.analysisReport = analysisReport; 
    }
    
}
