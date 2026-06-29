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
@CrossOrigin(origins = "http://localhost:5174")
public class ResumeController {
    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
        // Validate presence
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a valid file to upload.");
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
            Resume savedMetaRecord = resumeService.saveResume(file);
            
            // Return status confirmation payload
            return ResponseEntity.ok("File uploaded cleanly and cataloged with database reference ID: " + savedMetaRecord.getId());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Processing pipeline failure occurred: " + e.getMessage());
        }
    }
}
