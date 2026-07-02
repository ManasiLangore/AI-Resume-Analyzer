package com.analyzer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class GeminiApiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AiAnalysisResponse getResumeAnalysis(String resumeText, String jobDescription) {
        try {
            // 1️⃣ CRAFT THE PROMPT: Explicitly command the LLM to output ONLY raw JSON
            String prompt = "You are an expert corporate technical recruiter and ATS parsing scanner. " +
                    "Analyze the following Resume Text against the provided Job Description (JD).\n\n" +
                    "RESUME TEXT:\n" + resumeText + "\n\n" +
                    "JOB DESCRIPTION:\n" + jobDescription + "\n\n" +
                    "Provide your evaluation output as a single, raw, valid JSON object matching this schema exactly. " +
                    "Do not include any markdown formatting like ```json or wrappers. Output raw text string only:\n" +
                    "{\n" +
                    "  \"atsScore\": 75,\n" +
                    "  \"structuralCritique\": \"Summary of resume context formatting issues found...\",\n" +
                    "  \"matchedSkills\": [\"Java\", \"SQL\"],\n" +
                    "  \"missingSkills\": [\"Spring Boot\", \"Docker\"],\n" +
                    "  \"optimizationSuggestions\": [\"Rewrite project descriptions using action verbs.\", \"Add specific testing framework metrics.\"]\n" +
                    "}";

            // 2️⃣ BUILD THE OFFICIAL GEMINI REQUEST PAYLOAD STRUCTURE
            Map<String, Object> textMap = new HashMap<>();
            textMap.put("text", prompt);

            Map<String, Object> partsMap = new HashMap<>();
            partsMap.put("parts", new Object[]{textMap});

            Map<String, Object> bodyMap = new HashMap<>();
            bodyMap.put("contents", new Object[]{partsMap});

            // 3️⃣ SET HTTP HEADERS
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(bodyMap, headers);

            // 4️⃣ FIRE THE WEB REQUEST POST HANDSHAKE
            String finalUrl = apiUrl + "?key=" + apiKey;
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(finalUrl, requestEntity, String.class);

            // 5️⃣ PARSE THE COMPLEX AI RESPONSE DOWN TO OUR OBJECT
            JsonNode rootNode = objectMapper.readTree(responseEntity.getBody());
            String rawAiJsonText = rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText()
                    .trim();

            // Clean up any stray markdown wrappers the AI might have accidentally appended
            if (rawAiJsonText.startsWith("```json")) {
                rawAiJsonText = rawAiJsonText.substring(7);
            }
            if (rawAiJsonText.startsWith("```")) {
                rawAiJsonText = rawAiJsonText.substring(3);
            }
            if (rawAiJsonText.endsWith("```")) {
                rawAiJsonText = rawAiJsonText.substring(0, rawAiJsonText.length() - 3);
            }

            // Map the raw string response cleanly back into our Java data carrier bean object
            return objectMapper.readValue(rawAiJsonText.trim(), AiAnalysisResponse.class);

        } catch (Exception e) {
            System.err.println("Gemini Integration Breakdown: " + e.getMessage());
            // Fallback object to keep the application from hard crashing if network dropouts occur
            return new AiAnalysisResponse(0, "AI analysis pipeline timeout. Details: " + e.getMessage(), 
                    List.of(), List.of(), List.of("Verify network data connection statuses."));
        }
    }
}