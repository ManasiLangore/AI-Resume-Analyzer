package com.analyzer.service;

import com.analyzer.entity.Resume;
import com.analyzer.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Service
public class ResumeService {
    @Autowired
    private ResumeRepository resumeRepo;

    @Autowired
    private FileTextExtractor fileTextExtractor;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads";

    public Resume saveAndProcessResume(MultipartFile file, String jobDescription) throws IOException{
        // Ensure folder directory infrastructure setup matches target specifications
        File directory = new File(UPLOAD_DIR);
        if(!directory.exists()){
            directory.mkdirs();
        }

        String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.-]","_");
        Path targetPath = Paths.get(UPLOAD_DIR + File.separator + uniqueFileName);

        // Write binary payload to local disk
        Files.write(targetPath, file.getBytes());

        // EXTRACT PLAIN TEXT FROM THE SAVED RESUME FILE!
        String extractedResumeText = fileTextExtractor.extractText(targetPath.toString(),  file.getContentType());

        // For tracking/debugging purposes, let's print a snippet of what was read to the terminal console log
        System.out.println("=== EXTRACTED RESUME TEXT SNIPPET ===");
        System.out.println(extractedResumeText.length() > 500 ? extractedResumeText.substring(0, 500) + "..." : extractedResumeText);
        System.out.println("=====================================");

        // Record file metadata properties inside the DB engine
        Resume resumeRecord = new Resume(
            uniqueFileName,
            file.getContentType(),
            targetPath.toString(),
            LocalDateTime.now()
        );

        return resumeRepo.save(resumeRecord);
    }
}
