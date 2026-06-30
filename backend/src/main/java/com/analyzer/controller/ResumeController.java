package com.analyzer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.analyzer.entity.Resume;
import com.analyzer.service.ResumeService;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {
    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(
        @RequestParam("file") MultipartFile file,
        @RequestParam("jobDescription") String jobDescription) {
        // Validate presence
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a valid file to upload.");
        }
        if (jobDescription == null || jobDescription.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Please provide a target job description for comparison.");
        }

        // Validate type constraints
        String contentType = file.getContentType();
        if (contentType == null || (!contentType.equals("application/pdf") && 
            !contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                    .body("Unsupported file formatting. Please provide native .pdf or .docx data assets.");
        }

        try {
            // Hand off execution responsibility to Service business layers
            Resume savedMetaRecord = resumeService.saveAndProcessResume(file, jobDescription);
            
            // Temporarily printing the job description to the console to make sure it arrives cleanly!
            System.out.println("--- RECEIVED JOB DESCRIPTION FOR RESUME ID: " + savedMetaRecord.getId() + " ---");
            System.out.println(jobDescription);
            System.out.println("-------------------------------------------------------------------------");
        
            // Return status confirmation payload
            return ResponseEntity.ok("File uploaded cleanly and cataloged with database reference ID: " + savedMetaRecord.getId());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Processing pipeline failure occurred: " + e.getMessage());
        }
    }
}
