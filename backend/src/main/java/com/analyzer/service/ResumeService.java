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

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads";

    public Resume saveResume(MultipartFile file) throws IOException{
        File directory = new File(UPLOAD_DIR);
        if(!directory.exists()){
            directory.mkdirs();
        }

        String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.-]","_");
        Path targetPath = Paths.get(UPLOAD_DIR + File.separator + uniqueFileName);

        Files.write(targetPath, file.getBytes());

        Resume resumeRecord = new Resume(
            uniqueFileName,
            file.getContentType(),
            targetPath.toString(),
            LocalDateTime.now()
        );

        return resumeRepo.save(resumeRecord);
    }
}
