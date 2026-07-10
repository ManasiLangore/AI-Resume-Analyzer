package com.analyzer.controller;

import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.nio.file.Path;


import com.analyzer.entity.Resume;
import com.analyzer.service.ResumeService;
// import com.analyzer.service.AnalysisResult;
import com.analyzer.service.AiAnalysisResponse;


@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {
    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(
        @RequestParam("file") MultipartFile file,
        @RequestParam("jobDescription") String jobDescription,
        @RequestParam("userId") Long userId) {
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
            //AnalysisResult metricsResult = resumeService.saveAndProcessResume(file, jobDescription);
            AiAnalysisResponse aiMetrics = resumeService.saveAndProcessResume(file, jobDescription, userId);
        
            // Return the calculation dataset payload as a JSON object directly to React
            // return ResponseEntity.ok(metricsResult);
            return ResponseEntity.ok(aiMetrics);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Processing pipeline failure occurred: " + e.getMessage());
        }
    }

    // NEW HISTORICAL RECORDS ROUTE
    @GetMapping("/history")
public ResponseEntity<List<Resume>> getHistoryLogs(@RequestParam Long userId){
        try{
            List<Resume> userResumes = resumeService.getHistoryLogsByUserId(userId);
            return ResponseEntity.ok(userResumes);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSpecificHistory(@PathVariable Long id) {
        boolean isDeleted = resumeService.deleteResumeById(id);
        
        if (isDeleted) {
            return ResponseEntity.ok("Record deleted successfully!");
        } 
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found.");
        }
    }

    @GetMapping("/{id}/file")
        public ResponseEntity<Resource> getOriginalResumeFile(@PathVariable Long id) {
            try {
                // Fetch the file metadata using your service
                com.analyzer.entity.Resume resume = resumeService.getHistoryLogs()
                        .stream()
                        .filter(r -> r.getId().equals(id))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("File record not found"));

                Path file = Paths.get(resume.getFilePath());
                Resource resource = new UrlResource(file.toUri());

                if (resource.exists() || resource.isReadable()) {
                    return ResponseEntity.ok()
                            // This header tells the browser to try to open it inline (PDF/Images) rather than force downloading
                            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                            .contentType(MediaType.parseMediaType(resume.getFileType()))
                            .body(resource);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                return ResponseEntity.internalServerError().build();
            }
        }
}
