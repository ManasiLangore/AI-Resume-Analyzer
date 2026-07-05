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
import java.util.List;

@Service
public class ResumeService {
    @Autowired
    private ResumeRepository resumeRepo;

    @Autowired
    private FileTextExtractor fileTextExtractor;

    @Autowired
    // private AnalysisService analysisService;
    private GeminiApiService geminiApiService;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads";

    public AiAnalysisResponse saveAndProcessResume(MultipartFile file, String jobDescription) throws IOException{
        // Ensure folder directory infrastructure setup matches target specifications
        File directory = new File(UPLOAD_DIR);
        if(!directory.exists()){
            directory.mkdirs();
        }

        String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.-]","_");
        Path targetPath = Paths.get(UPLOAD_DIR + File.separator + uniqueFileName);

        // Write binary payload to local disk
        Files.write(targetPath, file.getBytes());

        // Extract plain text from the saved resume file
        String extractedResumeText = fileTextExtractor.extractText(targetPath.toString(),  file.getContentType());


        //process matching analysis via Gemini API client
        AiAnalysisResponse aiMetrics = geminiApiService.getResumeAnalysis(extractedResumeText, jobDescription);

        //Check if the API actually succeeded before saving to MySQL
        if (aiMetrics == null || aiMetrics.getAtsScore() == 0 && aiMetrics.getStructuralCritique().contains("error")) {
            throw new RuntimeException("Google Gemini API is currently unavailable due to high demand. Please try again in a moment.");
        }

        // Formulate a clean combined summary text block to save into the TEXT column
        String combinedReport = "### Structural Critique\n" + aiMetrics.getStructuralCritique() + "\n\n" +
                               "### Matched Skills\n" + String.join(", ", aiMetrics.getMatchedSkills()) + "\n\n" +
                               "### Missing Skills\n" + String.join(", ", aiMetrics.getMissingSkills()) + "\n\n" +
                               "### Suggestions\n" + String.join(", ", aiMetrics.getOptimizationSuggestions());

        // Record file metadata properties inside the DB engine
        Resume resumeRecord = new Resume();

        resumeRecord.setFileName(uniqueFileName);
        resumeRecord.setFileType(file.getContentType());
        resumeRecord.setFilePath(targetPath.toString());
        resumeRecord.setUploadTime(LocalDateTime.now());
        resumeRecord.setMatchScore(aiMetrics.getAtsScore());
        resumeRecord.setStructuralCritique(aiMetrics.getStructuralCritique());
        resumeRecord.setMatchedSkills(String.join(", ", aiMetrics.getMatchedSkills()));
        resumeRecord.setMissingSkills(String.join(", ", aiMetrics.getMissingSkills()));
        resumeRecord.setOptimizationSuggestions(String.join(", ", aiMetrics.getOptimizationSuggestions()));

        resumeRepo.save(resumeRecord);
        return aiMetrics;

        //Pass text blocks to calculate analytics instantly
        // return analysisService.analyzeResumeMatch(extractedResumeText, jobDescription);
        // return geminiApiService.getResumeAnalysis(extractedResumeText, jobDescription);
    }

    // New Service support wrapper method to query historical rows
    public List<Resume> getHistoryLogs() {
        return resumeRepo.findAllByOrderByUploadTimeDesc();
    }

    //to delete specific record histroy
    public boolean deleteResumeById(Long id) {
    if (resumeRepo.existsById(id)) {
        resumeRepo.deleteById(id);
        return true;
    }
    return false;
}
}
